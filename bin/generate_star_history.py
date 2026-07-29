#!/usr/bin/env python3
"""Render the repository's star history to committed SVGs.

al-folio used to hotlink api.star-history.com. That service began returning
HTTP 500 for every repository, and its UI now asks visitors to paste a GitHub
token with `Contents: read and write` — a permission that can push code and is
not required to read public star data. This script removes the dependency: the
stargazer timestamps it needs are public, so the chart is generated here and
committed as a static asset that cannot fail to load or prompt for anything.

Two files are written, light and dark, because GitHub's README renderer picks
between them with <picture> + prefers-color-scheme. A single SVG using an
internal media query does not work reliably through GitHub's image proxy.

Usage:
    python3 bin/generate_star_history.py [--repo owner/name] [--out-dir DIR]

GITHUB_TOKEN is optional but strongly recommended: unauthenticated API access
is capped at 60 requests/hour, which is not enough for a repository with more
than a few thousand stars.
"""

from __future__ import annotations

import argparse
import json
import math
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone

API = "https://api.github.com"
PER_PAGE = 100
# GitHub refuses to paginate past 400 pages on this endpoint.
MAX_PAGE = 400
# How many pages to sample across the full range. The curve is smooth enough
# that sampling beats fetching all ~160 pages of a 16k-star repo on every push.
SAMPLES = 28

THEMES = {
    "light": {
        "bg": "#ffffff",
        "text": "#000000",
        "muted": "#828282",
        "grid": "rgba(0,0,0,0.10)",
        "accent": "#b509ac",
        "fill_from": "rgba(181,9,172,0.28)",
        "fill_to": "rgba(181,9,172,0.02)",
    },
    "dark": {
        "bg": "#1c1c1d",
        "text": "#e8e8e8",
        "muted": "#828282",
        "grid": "#424246",
        "accent": "#d94fd0",
        "fill_from": "rgba(217,79,208,0.32)",
        "fill_to": "rgba(217,79,208,0.02)",
    },
}

FONT = (
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',"
    "Arial,sans-serif"
)

W, H = 820, 420
M_L, M_R, M_T, M_B = 68, 28, 64, 48


def _get(url: str, token: str | None, accept: str) -> tuple[object, dict]:
    req = urllib.request.Request(url, headers={"Accept": accept, "User-Agent": "al-folio-star-history"})
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode()), dict(resp.headers)
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode(errors="replace")[:200]
        if exc.code == 403 and "rate limit" in detail.lower():
            raise SystemExit(
                "GitHub API rate limit hit. Set GITHUB_TOKEN "
                "(in Actions, pass secrets.GITHUB_TOKEN) and retry."
            ) from exc
        raise SystemExit(f"GET {url} failed: HTTP {exc.code}: {detail}") from exc


def fetch_points(repo: str, token: str | None) -> tuple[list[tuple[datetime, int]], int, bool]:
    """Return ([(date, cumulative_stars)], total, truncated_by_pagination_cap)."""
    meta, _ = _get(f"{API}/repos/{repo}", token, "application/vnd.github+json")
    total = int(meta.get("stargazers_count", 0))
    if total == 0:
        return [], 0, False

    last_page = min(math.ceil(total / PER_PAGE), MAX_PAGE)
    if last_page <= SAMPLES:
        pages = list(range(1, last_page + 1))
    else:
        step = (last_page - 1) / (SAMPLES - 1)
        pages = sorted({1, last_page} | {round(1 + i * step) for i in range(SAMPLES)})

    star_accept = "application/vnd.github.star+json"
    points: list[tuple[datetime, int]] = []
    newest: datetime | None = None

    for page in pages:
        url = f"{API}/repos/{repo}/stargazers?per_page={PER_PAGE}&page={page}"
        batch, _ = _get(url, token, star_accept)
        if not isinstance(batch, list) or not batch:
            continue
        first = batch[0].get("starred_at")
        if first:
            # Everything on earlier pages was starred before this entry.
            points.append((_parse(first), (page - 1) * PER_PAGE + 1))
        if page == last_page:
            last = batch[-1].get("starred_at")
            if last:
                newest = _parse(last)
                points.append((newest, (page - 1) * PER_PAGE + len(batch)))

    # GitHub stops paginating this endpoint at page 400, so for a repository
    # with more than 40,000 stars we cannot observe when the later ones arrived.
    capped = last_page >= MAX_PAGE and total > MAX_PAGE * PER_PAGE

    if capped:
        # Back-dating the full total onto the last *observable* star would draw a
        # vertical cliff at that old date and freeze the x-axis there, inventing
        # history that was never measured. The current total on today's date is a
        # fact, so anchor there and let the segment between be interpolated, the
        # same approximation already used between every other sampled point.
        # Truncated to midnight so reruns within a day stay byte-identical.
        now = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
        points.append((now, total))
    elif newest and total > points[-1][1]:
        # Dated to the most recent star rather than "now", so a run on a day with
        # no new stars produces a byte-identical file instead of a junk commit.
        points.append((newest, total))

    points.sort(key=lambda p: p[0])
    deduped: list[tuple[datetime, int]] = []
    for date, count in points:
        if deduped and date == deduped[-1][0]:
            deduped[-1] = (date, max(count, deduped[-1][1]))
        else:
            deduped.append((date, count))
    return deduped, total, capped


def _parse(value: str) -> datetime:
    return datetime.strptime(value, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)


def _nice_ceiling(value: int) -> tuple[int, int]:
    """Round an axis maximum up to something a human would pick."""
    if value <= 10:
        return max(value, 1), max(value, 1)
    magnitude = 10 ** (len(str(value)) - 1)
    for mult in (1, 2, 2.5, 5, 10):
        step = magnitude * mult / 2
        top = math.ceil(value / step) * step
        if top / step <= 5:
            return int(top), int(step)
    return value, max(1, value // 4)


def _fmt_count(n: int) -> str:
    if n >= 1000:
        text = f"{n / 1000:.1f}".rstrip("0").rstrip(".")
        return f"{text}k"
    return str(n)


def _smooth_path(pts: list[tuple[float, float]]) -> str:
    """Catmull-Rom through the points, emitted as cubic beziers."""
    if len(pts) < 2:
        return ""
    if len(pts) == 2:
        return f"M {pts[0][0]:.2f},{pts[0][1]:.2f} L {pts[1][0]:.2f},{pts[1][1]:.2f}"
    d = [f"M {pts[0][0]:.2f},{pts[0][1]:.2f}"]
    for i in range(len(pts) - 1):
        p0 = pts[i - 1] if i > 0 else pts[0]
        p1, p2 = pts[i], pts[i + 1]
        p3 = pts[i + 2] if i + 2 < len(pts) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d.append(f"C {c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {p2[0]:.2f},{p2[1]:.2f}")
    return " ".join(d)


def render(points: list[tuple[datetime, int]], total: int, repo: str, theme: str, capped: bool = False) -> str:
    t = THEMES[theme]
    plot_w, plot_h = W - M_L - M_R, H - M_T - M_B
    t0, t1 = points[0][0].timestamp(), points[-1][0].timestamp()
    span = max(t1 - t0, 1)
    y_max, y_step = _nice_ceiling(total)

    def sx(dt: datetime) -> float:
        return M_L + (dt.timestamp() - t0) / span * plot_w

    def sy(count: int) -> float:
        return M_T + plot_h - (count / y_max) * plot_h

    xy = [(sx(d), sy(c)) for d, c in points]
    line = _smooth_path(xy)
    area = f"{line} L {xy[-1][0]:.2f},{M_T + plot_h:.2f} L {xy[0][0]:.2f},{M_T + plot_h:.2f} Z"

    grid, y_labels = [], []
    v = 0
    while v <= y_max:
        y = sy(v)
        grid.append(f'<line x1="{M_L}" y1="{y:.2f}" x2="{W - M_R}" y2="{y:.2f}" />')
        y_labels.append(
            f'<text x="{M_L - 12}" y="{y + 4:.2f}" text-anchor="end" class="ax">{_fmt_count(v)}</text>'
        )
        v += y_step

    # Tick on calendar years across the whole range, not on sampled points:
    # early years are all inside page 1, so point-derived ticks skip them and
    # the axis reads as though data were missing.
    first_year, last_year = points[0][0].year, points[-1][0].year
    every = max(1, math.ceil((last_year - first_year + 1) / 12))
    years = [
        datetime(y, 1, 1, tzinfo=timezone.utc)
        for y in range(first_year, last_year + 1)
        if (y - first_year) % every == 0
    ]
    # Drop a tick that would collide with the axis edges.
    years = [d for d in years if M_L - 1 <= sx(d) <= W - M_R + 1]
    x_labels = [
        f'<text x="{sx(d):.2f}" y="{M_T + plot_h + 26}" text-anchor="middle" class="ax">{d.year}</text>'
        for d in years
    ]

    # Say so rather than passing off an interpolated segment as measured data.
    subtitle = (
        f"{repo} · beyond {MAX_PAGE * PER_PAGE:,} stars the API stops paginating, so the tail is interpolated"
        if capped
        else repo
    )

    lx, ly = xy[-1]
    uid = theme  # keeps gradient ids unique if both files are ever inlined together

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="Star history for {repo}: {total} stars">
  <title>Star history for {repo}</title>
  <defs>
    <linearGradient id="fill-{uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{t['fill_from']}" />
      <stop offset="100%" stop-color="{t['fill_to']}" />
    </linearGradient>
    <clipPath id="plot-{uid}">
      <rect x="{M_L}" y="{M_T}" width="{plot_w}" height="{plot_h}" />
    </clipPath>
  </defs>
  <style>
    .ttl {{ font: 600 16px {FONT}; fill: {t['text']}; }}
    .sub {{ font: 400 12px {FONT}; fill: {t['muted']}; }}
    .ax  {{ font: 400 11px {FONT}; fill: {t['muted']}; }}
    .tot {{ font: 700 15px {FONT}; fill: {t['accent']}; }}
  </style>
  <rect width="{W}" height="{H}" fill="{t['bg']}" rx="6" />
  <text x="{M_L - 12}" y="30" class="ttl">Star History</text>
  <text x="{M_L - 12}" y="48" class="sub">{subtitle}</text>
  <text x="{W - M_R}" y="34" text-anchor="end" class="tot">★ {total:,}</text>
  <g stroke="{t['grid']}" stroke-width="1" shape-rendering="crispEdges">
{chr(10).join("    " + g for g in grid)}
  </g>
  <g>
{chr(10).join("    " + lbl for lbl in y_labels)}
  </g>
  <g>
{chr(10).join("    " + lbl for lbl in x_labels)}
  </g>
  <g clip-path="url(#plot-{uid})">
    <path d="{area}" fill="url(#fill-{uid})" />
    <path d="{line}" fill="none" stroke="{t['accent']}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  <circle cx="{lx:.2f}" cy="{ly:.2f}" r="7" fill="{t['accent']}" opacity="0.18" />
  <circle cx="{lx:.2f}" cy="{ly:.2f}" r="3.5" fill="{t['accent']}" stroke="{t['bg']}" stroke-width="1.5" />
</svg>
"""


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--repo", default="alshedivat/al-folio")
    ap.add_argument("--out-dir", default="assets/img")
    args = ap.parse_args()

    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if not token:
        print("warning: no GITHUB_TOKEN set; 60 req/hour limit may not suffice", file=sys.stderr)

    points, total, capped = fetch_points(args.repo, token)
    if len(points) < 2:
        print(f"error: not enough stargazer data for {args.repo} (got {len(points)} points)", file=sys.stderr)
        return 1

    os.makedirs(args.out_dir, exist_ok=True)
    for theme in THEMES:
        path = os.path.join(args.out_dir, f"star-history-{theme}.svg")
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(render(points, total, args.repo, theme, capped))
        print(f"wrote {path}")
    note = "  [truncated by API page cap; tail interpolated]" if capped else ""
    print(f"{total:,} stars, {len(points)} sampled points, {points[0][0].date()} to {points[-1][0].date()}{note}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
