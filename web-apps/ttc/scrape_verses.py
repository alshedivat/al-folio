#!/usr/bin/env python3
import os


def scrape_translations():
    translations_dir = "translations"

    for translator_dir in os.listdir(translations_dir):
        translator_path = os.path.join(translations_dir, translator_dir)

        if not os.path.isdir(translator_path):
            continue

        verses = []

        for i in range(1, 82):
            verse_file = os.path.join(translator_path, f"{i}.txt")

            if os.path.exists(verse_file):
                with open(verse_file, "r", encoding="utf-8") as f:
                    content = f.read().strip()
                    content_escaped = content.replace('"', '\\"').replace("\n", "\\n")
                    verses.append(f'"{content_escaped}"')
            else:
                verses.append(f'"Verse {i}: File not found"')

        js_content = (
            f"const {translator_dir}_verses = [\n    " + ",\n    ".join(verses) + "\n];"
        )

        with open(f"{translator_dir}.js", "w", encoding="utf-8") as f:
            f.write(js_content)

        print(f"Created {translator_dir}.js with {len(verses)} verses")


if __name__ == "__main__":
    scrape_translations()
