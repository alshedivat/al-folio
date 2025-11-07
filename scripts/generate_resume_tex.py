#!/usr/bin/env python3
"""Generate a LaTeX resume from a JSON Resume file.

The resulting document uses a clean, serif-forward layout that can be compiled
with XeLaTeX or LuaLaTeX for modern typographic features.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import textwrap
from pathlib import Path
from typing import Any, Callable, Dict, Iterable, List, Optional

LATEX_SPECIALS = {
    "\\": r"\\textbackslash{}",
    "&": r"\&",
    "%": r"\%",
    "$": r"\$",
    "#": r"\#",
    "_": r"\_",
    "{": r"\{",
    "}": r"\}",
    "~": r"\textasciitilde{}",
    "^": r"\textasciicircum{}",
}

HTML_TAG_RE = re.compile(r"<[^>]+>")
BULLET_RE = re.compile(r"^[\u2022\u2023\u2043\-\*\s]+")
FA_COMMAND_RE = re.compile(r"\\fa(?:Icon(?:\[[^\]]+\])?\{[^}]+\}|[A-Z][a-zA-Z]+)")
ICON_TAG_RE = re.compile(r"<i\s+class=['\"](?P<classes>[^'\"]+)['\"]\s*></i>", re.IGNORECASE)
ICON_STYLE_PREFIXES = {
    "fa-solid",
    "fa-regular",
    "fa-light",
    "fa-thin",
    "fa-duotone",
    "fa-brands",
}
ICON_FALLBACKS = {
    "people-group": "users",
    "person-running": "running",
    "kitchen-set": "utensils",
}


def latex_escape(text: Optional[str], allow_fa: bool = False) -> str:
    """Escape LaTeX special characters, optionally preserving FontAwesome macros."""
    if not text:
        return ""
    escaped: List[str] = []
    idx = 0
    while idx < len(text):
        if allow_fa and text[idx] == "\\":
            match = FA_COMMAND_RE.match(text, idx)
            if match:
                escaped.append(match.group(0))
                idx = match.end()
                continue
        ch = text[idx]
        escaped.append(LATEX_SPECIALS.get(ch, ch))
        idx += 1
    return "".join(escaped)

def _icon_command_from_classes(class_string: str) -> str:
    tokens = [token.strip() for token in class_string.split() if token.strip()]
    for token in reversed(tokens):
        if token.startswith("fa-") and token not in ICON_STYLE_PREFIXES:
            icon_name = token[3:]
            icon_name = ICON_FALLBACKS.get(icon_name, icon_name)
            if icon_name:
                return f"\\faIcon{{{icon_name}}}"
    return ""


def interpret_fontawesome_icons(value: Any) -> Any:
    """Replace FontAwesome icon markup or class lists with LaTeX commands."""
    if isinstance(value, dict):
        return {key: interpret_fontawesome_icons(val) for key, val in value.items()}
    if isinstance(value, list):
        return [interpret_fontawesome_icons(item) for item in value]
    if not isinstance(value, str):
        return value
    if not value:
        return ""

    def replace_tag(match: re.Match[str]) -> str:
        command = _icon_command_from_classes(match.group("classes"))
        return command or ""

    transformed = ICON_TAG_RE.sub(replace_tag, value)
    stripped = transformed.strip()
    if stripped and all(part.startswith("fa-") for part in stripped.split()):
        command = _icon_command_from_classes(stripped)
        if command:
            return command
    return transformed

def strip_html(text: Optional[str]) -> str:
    """Remove simple HTML markup."""
    if not text:
        return ""
    return HTML_TAG_RE.sub("", text)


def format_inline(text: Optional[str], allow_icons: bool = False) -> str:
    if not text:
        return ""
    processed = interpret_fontawesome_icons(text) if allow_icons else text
    cleaned = strip_html(processed)
    return latex_escape(cleaned, allow_fa=allow_icons)


def format_date(date_str: Optional[str]) -> str:
    if not date_str:
        return "Present"
    try:
        parsed = dt.datetime.fromisoformat(date_str)
    except ValueError:
        return latex_escape(date_str)
    return parsed.strftime("%b %Y")


def split_lines(multiline: Optional[str]) -> List[str]:
    if not multiline:
        return []
    lines = []
    for raw in multiline.splitlines():
        stripped = BULLET_RE.sub("", raw).strip()
        if stripped:
            lines.append(stripped)
    return lines


def make_itemize(lines: Iterable[str]) -> str:
    escaped = [format_inline(line) for line in lines]
    if not escaped:
        return ""
    body = "\n".join(f"    \item {line}" for line in escaped)
    return "\\begin{itemize}[leftmargin=*]\n" + body + "\n\\end{itemize}"


def join_keywords(keywords: Optional[Iterable[str]]) -> str:
    if not keywords:
        return ""
    return ", ".join(latex_escape(word) for word in keywords if word)


def normalize_list(value: Any) -> List[str]:
    if not value:
        return []
    if isinstance(value, str):
        return [value]
    return [str(item) for item in value]


def format_summary(summary: Optional[str]) -> str:
    lines = split_lines(summary)
    if not lines:
        return ""
    joined = " \\\\ ".join(format_inline(line) for line in lines)
    return f"\\textit{{{joined}}}"


def compose_body(summary: Optional[str] = None, bullets: Any = None, tail: Optional[str] = None) -> str:
    parts: List[str] = []
    summary_block = format_summary(summary)
    if summary_block:
        parts.append(summary_block)
    items = normalize_list(bullets)
    if items:
        parts.append(make_itemize(items))
    if tail:
        parts.append(tail)
    return "\n".join(part for part in parts if part)


def hyperlink(text: str, url: Optional[str]) -> str:
    """Wrap ``text`` in a hyperref link when ``url`` is provided."""
    if not text:
        return ""
    if not url:
        return text
    return rf"\href{{{latex_escape(url)}}}{{{text}}}"


def compute_period(start_date: Optional[str], end_date: Optional[str]) -> tuple[str, str]:
    """Return formatted start/end range mirroring existing logic."""
    start = format_date(start_date) if start_date else ""
    if end_date:
        end = format_date(end_date)
    else:
        end = "Present" if start else ""
    return start, end


def render_entry_list(items: Iterable[Dict[str, Any]], renderer: Callable[[Dict[str, Any]], str]) -> str:
    """Render a sequence of dicts using ``renderer`` and join with blank lines."""
    return "\n\n".join(entry for entry in (renderer(item) for item in items) if entry)


def build_entry(
    header: str,
    subheader: str = "",
    location: str = "",
    start: str = "",
    end: str = "",
    body: str = "",
    meta: Optional[List[str]] = None,
) -> str:
    meta = meta or []
    header_line = f"\\noindent\\textbf{{{header}}}"
    if start and end:
        header_line += f" \\hfill {start} -- {end}"
    elif start:
        header_line += f" \\hfill {start}"
    elif end:
        header_line += f" \\hfill {end}"
    header_line += "\\\n"

    lines: List[str] = [header_line]
    if location:
        lines.append("\\\\ \n \\textcolor{accentcolor}{\\faIcon{map-marker-alt}}")
        lines.append(f"\\enspace\\textit{{{location}}}\n")
    for entry in meta:
        if entry:
            lines.append(entry if entry.endswith("\n") else f"{entry}\n")
    if subheader:
        lines.append(f"\\\\ \n \\textcolor{{accentcolor}}{{\\textbf{{{subheader}}}}}\n\\\\")
    if body:
        lines.append(body if lines[-1].endswith("\\\\") else f"\\\\ {body}")
    lines.append("\\vspace{0.6em}\n\\hrule\n\\vspace{0.6em}")
    return "".join(lines)


def section(title: str, body: str) -> str:
    if not body.strip():
        return ""
    return f"\\section*{{{latex_escape(title)}}}\n{body}\n"


def render_header(basics: Dict[str, Any]) -> str:
    name = format_inline(basics.get("name", ""))
    label = format_inline(basics.get("label"), allow_icons=True)

    contacts: List[str] = []
    email = basics.get("email")
    if email:
        contacts.append(rf"\\\faIcon{{envelope}} \enspace \href{{mailto:{email}}}{{{latex_escape(email)}}}")
    phone = basics.get("phone")
    if phone:
        contacts.append(f"\\\\ \\faIcon{{phone}} \\enspace{latex_escape(phone)}")
    url = basics.get("url")
    if url:
        contacts.append(rf"\\ \faIcon{{link}} \enspace \href{{{url}}}{{{latex_escape(url)}}}")

    location = basics.get("location", {})
    city = location.get("city")
    region = location.get("region")
    country = location.get("countryCode")
    locality = ", ".join(filter(None, [city, region, country]))
    if locality:
        contacts.append(f"\\\\ \\faIcon{{map-marker-alt}} \\enspace {latex_escape(locality)}")
    
    contacts_line = "\n\\".join(contacts)

    summary = basics.get("summary")
    summary_block = (
        "\\vspace{0.7em}" + latin_paragraph(summary)
        if summary
        else ""
    )

    return (
        "\\begin{center}\n"
        f"    \\Huge\\textbf{{{name}}}\\\\\n"
        f"    \\vspace{{0.2em}}\\large {label}\\\n"
        f"    \\vspace{{0.6em}}\\normalsize {contacts_line}\\\n"
        "\\end{center}\n"
        f"{summary_block}\n"
    )


def latin_paragraph(text: Optional[str]) -> str:
    return format_inline(text)


def _render_experience_entry(role: Dict[str, Any]) -> str:
    company = format_inline(role.get("name", ""))
    position = format_inline(role.get("position", ""))
    url = role.get("url")
    header = hyperlink(company or position, url)
    subheader = position if company and position else ""
    location = format_inline(role.get("location", ""))
    start, end = compute_period(role.get("startDate"), role.get("endDate"))
    body = compose_body(role.get("summary"), role.get("highlights"))
    return build_entry(
        header=header,
        subheader=subheader,
        location=location,
        start=start,
        end=end,
        body=body,
    )


def render_experience(work: List[Dict[str, Any]]) -> str:
    return render_entry_list(work, _render_experience_entry)


def render_list_section(data: Iterable[Dict[str, Any]], fmt: Callable[[Dict[str, Any]], str]) -> str:
    parts = [fmt(item) for item in data]
    return "\n\\\\".join(part for part in parts if part)


def render_grid_cell(content: str, grid_size: str) -> str:
    cells = [f"\\begin{{minipage}}[t]{{{grid_size}\\linewidth}}%", content, "\\end{minipage}%"]
    return "\n".join(cells)


def render_grid(contents: List[Any], renderer: Callable[[Any], str], column_count: int) -> str:
    if not contents:
        return ""
    rows: List[str] = []
    total = len(contents)
    index = 0
    while index < total:
        row_fragments = ["\n\\par%\n\\noindent%\n", renderer(contents[index])]
        index += 1
        for _ in range(column_count - 1):
            if index >= total:
                break
            row_fragments.extend(["\n\\hfill%\n", renderer(contents[index])])
            index += 1
        rows.append("".join(row_fragments))
    return "".join(rows)

def _render_project_entry(project: Dict[str, Any]) -> str:
    name = format_inline(project.get("name", ""))
    if not name:
        return ""
    url = project.get("url")
    header = hyperlink(name, url)
    location = format_inline(project.get("location", ""))
    start, end = compute_period(project.get("startDate"), project.get("endDate"))
    highlights = project.get("highlights") or project.get("keywords")
    body = compose_body(project.get("summary"), highlights)
    return build_entry(
        header=header,
        location=location,
        start=start,
        end=end,
        body=body,
    )


def render_projects(projects: List[Dict[str, Any]]) -> str:
    return render_entry_list(projects, _render_project_entry)


def _render_education_entry(record: Dict[str, Any]) -> str:
    institution = format_inline(record.get("institution", ""))
    if not institution:
        return ""
    degree = format_inline(record.get("studyType", ""))
    area = format_inline(record.get("area", ""))
    if degree and area:
        subheader = f"{degree} in {area}"
    else:
        subheader = degree or area
    url = record.get("url")
    header = hyperlink(institution, url)
    if subheader:
        subheader = format_inline(subheader)
    location = format_inline(record.get("location", ""))
    start, end = compute_period(record.get("startDate"), record.get("endDate"))
    courses = normalize_list(record.get("courses"))[:8]
    course_line = ""
    if courses:
        listed = ", ".join(format_inline(course) for course in courses)
        course_line = f"\\small\\textit{{Selected Coursework: {listed}}}"
    body = compose_body(record.get("summary"), record.get("highlights"), course_line)
    return build_entry(
        header=header,
        subheader=subheader,
        location=location,
        start=start,
        end=end,
        body=body,
    )


def render_education(education: List[Dict[str, Any]]) -> str:
    return render_entry_list(education, _render_education_entry)


def _render_volunteer_entry(role: Dict[str, Any]) -> str:
    organization = format_inline(role.get("organization", ""))
    position = format_inline(role.get("position", ""))
    url = role.get("url")
    header = hyperlink(organization or position, url)
    location = format_inline(role.get("location", ""))
    start, end = compute_period(role.get("startDate"), role.get("endDate"))
    body = compose_body(role.get("summary"), role.get("highlights"))
    return build_entry(
        header=header,
        subheader=position,
        location=location,
        start=start,
        end=end,
        body=body,
    )


def render_volunteer(volunteer: List[Dict[str, Any]]) -> str:
    return render_entry_list(volunteer, _render_volunteer_entry)


def render_publication(pub: Dict[str, Any]) -> str:
    title = format_inline(pub.get("name", ""))
    publisher = format_inline(pub.get("publisher", ""))
    date = format_date(pub.get("releaseDate"))
    summary = latin_paragraph(pub.get("summary"))
    url = pub.get("url")
    link = f" \\href{{{url}}}{{[link]}}" if url else ""
    return f"\\textbf{{{title}}} ({date})\\\n{publisher}{link}\\\n{summary}\\vspace{{0.5em}}"


def render_skill(skill: Dict[str, Any]) -> str:
    icon = format_inline(skill.get("icon"), allow_icons=True)
    icon = f"\\textcolor{{accentcolor}}{{{icon}}}"
    keywords = join_keywords(skill.get("keywords"))
    level = format_inline(skill.get("level"))
    name = format_inline(skill.get("name", ""))
    title = f"\\textbf{{{name}}}" + (f" ({level})" if level else "")
    line = (f"{icon}\\enspace " if icon else "") + title
    if keywords:
        line += f"\\\\ \n{keywords}"
    return line + "\\vspace{0.4em}"


def render_language(lang: Dict[str, Any]) -> str:
    icon = format_inline(lang.get("icon"), allow_icons=True)
    icon = f"\\textcolor{{accentcolor}}{{{icon}}}"
    language = format_inline(lang.get("language", ""))
    fluency = format_inline(lang.get("fluency", ""))
    icon_part = f"{icon}\\enspace " if icon else ""
    return f"{icon_part}{language} — {fluency}\\ "


def render_interest(interest: Dict[str, Any]) -> str:
    icon = format_inline(interest.get("icon"), allow_icons=True)
    icon = f"\\textcolor{{accentcolor}}{{{icon}}}"
    name = format_inline(interest.get("name", ""))
    return f"{icon}\\enspace {name}" if icon else name


def render_award(award: Dict[str, Any]) -> str:
    title = format_inline(award.get("title", ""))
    date = format_date(award.get("date"))
    awarder = format_inline(award.get("awarder", ""))
    summary = latin_paragraph(award.get("summary"))
    return f"\\textbf{{{title}}} ({date}) — {awarder}\\\n{summary}\\vspace{{0.4em}}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate LaTeX resume from JSON Resume data")
    parser.add_argument("resume_json", type=Path, help="Path to resume.json")
    parser.add_argument("--output", "-o", type=Path, default=Path("resume.tex"), help="Destination .tex file")
    args = parser.parse_args()

    with args.resume_json.open("r", encoding="utf-8") as handle:
        data = json.load(handle)

    data = interpret_fontawesome_icons(data)
    basics = data.get("basics", {})

    sections = [
        render_header(basics),
        section("Experience", render_experience(data.get("work", []))),
        section("Education", render_education(data.get("education", []))),
        section("Volunteer", render_volunteer(data.get("volunteer", []))),
        section(
            "Skills",
            render_grid(
                data.get("skills", []),
                lambda skill: render_grid_cell(render_skill(skill), "0.45"),
                2,
            ),
        ),
        section(
            "Languages",
            render_grid(
                data.get("languages", []),
                lambda lang: render_grid_cell(render_language(lang), "0.45"),
                2,
            ),
        ),
        section(
            "Interests",
            render_grid(
                data.get("interests", []),
                lambda interest: render_grid_cell(render_interest(interest), "0.45"),
                2,
            ),
        ),
        section("Awards", render_list_section(data.get("awards", []), render_award)),
        section("Publications", render_list_section(data.get("publications", []), render_publication)),
        section("Selected Projects", render_projects(data.get("projects", []))),
    ]

    document_body = "\n\n".join(part for part in sections if part)

    template = textwrap.dedent(
        f"""% Generated by generate_resume_tex.py
        % Compile with: xelatex {{output.tex}}
        \\documentclass[11pt]{{article}}
        \\usepackage[a4paper,margin=1.8cm]{{geometry}}
        \\usepackage{{xcolor}}
        \\definecolor{{accentcolor}}{{RGB}}{{0, 102, 204}}
        \\usepackage{{fontspec}}
        \\usepackage{{fontawesome5}}
        \\setmainfont{{Latin Modern Roman}}
        \\usepackage{{enumitem}}
        \\usepackage[colorlinks=true,linkcolor=black,urlcolor=black]{{hyperref}}
        \\setlist[itemize]{{nosep}}
        \\begin{{document}}
        \\pagestyle{{empty}}
        {document_body}
        \\end{{document}}
        """
    ).strip() + "\n"

    args.output.write_text(template, encoding="utf-8")
    print(f"LaTeX resume written to {args.output}")


if __name__ == "__main__":
    main()
