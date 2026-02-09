#!/usr/bin/env python3
from datetime import datetime
from io import StringIO
from typing import Dict, List, Optional, Tuple
from urllib.parse import urljoin

import pandas as pd
import requests
from bs4 import BeautifulSoup

BASE_URL = (
    "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"
)
DATE_COLS = ["Final Action", "Dates for Filing"]


def convert_visa_date(date_str: str) -> Optional[str]:
    """Convert visa bulletin date format (e.g., '01FEB16') to YYYY-MM-DD format."""
    if not date_str or date_str == "C" or date_str == "U":
        return date_str

    try:
        # Handle different date formats
        if len(date_str) == 7:  # Format: 01FEB16
            day = date_str[:2]
            month = date_str[2:5]
            year = "20" + date_str[5:]  # Assuming 20xx
        elif len(date_str) == 8:  # Format: 01FEB2023
            day = date_str[:2]
            month = date_str[2:5]
            year = date_str[5:]
        else:
            return date_str  # Return as is if format not recognized

        # Convert month abbreviation to number
        month_num = datetime.strptime(month, "%b").month

        # Create date string in YYYY-MM-DD format
        return f"{year}-{month_num:02d}-{day}"
    except (ValueError, IndexError):
        return date_str  # Return original if conversion fails


def get_month_links() -> List[Tuple[str, str]]:
    resp = requests.get(BASE_URL)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "lxml")
    links = []

    # Generate years from 2022 to current year
    current_year = datetime.now().year
    target_years = [str(year) for year in range(2022, current_year + 1)]

    for a in soup.select("a[href*='visa-bulletin-for-']"):
        href = a.get("href")
        full = urljoin(BASE_URL, href)
        text = a.get_text(strip=True)

        # Filter for 2022 onwards
        if any(year in href for year in target_years):
            links.append((text, full))

    return list(dict(links).items())  # dedupe preserving order


def scrape_eb2_niw(url: str) -> Dict[str, str]:
    resp = requests.get(url)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "lxml")
    tables = soup.find_all("table")
    result = {"month": None, "final_action": None, "dates_for_filing": None}

    print(f"\nProcessing URL: {url}")
    print(f"Found {len(tables)} tables")

    # Extract month from URL or page title
    if "visa-bulletin-for-" in url:
        month_part = url.split("visa-bulletin-for-")[-1].replace(".html", "")
        result["month"] = month_part.replace("-", " ").title()
    else:
        # Fallback to page title
        title = soup.find("title")
        if title:
            result["month"] = title.get_text(strip=True)

    print(f"Extracted month: {result['month']}")

    # Look for employment-based tables
    for i, table in enumerate(tables):
        print(f"\nTable {i + 1}:")

        try:
            df = pd.read_html(StringIO(str(table)), header=0)[0]
            print(f"DataFrame shape: {df.shape}")
            print("DataFrame columns:", df.columns.tolist())

            # Skip empty tables
            if df.empty:
                print("Skipping empty table")
                continue

            # Check if this is an employment-based table
            first_col_name = str(df.columns[0]).lower()
            if "employment" not in first_col_name:
                print("Skipping table - not an employment-based table")
                continue

            print("Found employment-based table")
            print("First few rows:")
            for idx in range(min(3, len(df))):
                print(f"  Row {idx}: {df.iloc[idx].tolist()}")

            # Find the EB-2 row (look for "2nd" in first column)
            eb2_row = None
            for idx, row in df.iterrows():
                cell_text = str(row.iloc[0]).strip().lower()
                if "2nd" in cell_text:
                    eb2_row = row
                    print(f"Found EB-2 row at index {idx}: {eb2_row.tolist()}")
                    break

            if eb2_row is not None:
                # Get the date from the "All Chargeability Areas" column (usually 2nd column)
                if len(eb2_row) > 1:
                    date_str = str(eb2_row.iloc[1]).strip()
                    print(f"Extracted date: {date_str}")

                    # Determine if this is Final Action or Dates for Filing table
                    # Look for text before the table
                    table_context = ""
                    prev_elements = table.find_all_previous(text=True, limit=20)
                    for text in prev_elements:
                        if text and text.strip():
                            table_context += text.strip().upper() + " "
                            if len(table_context) > 500:  # Limit context length
                                break

                    print(f"Table context: {table_context[:200]}...")

                    if "FINAL ACTION" in table_context:
                        result["final_action"] = convert_visa_date(date_str)
                        print(f"Set final_action to {result['final_action']}")
                    elif (
                        "DATES FOR FILING" in table_context or "FILING" in table_context
                    ):
                        result["dates_for_filing"] = convert_visa_date(date_str)
                        print(f"Set dates_for_filing to {result['dates_for_filing']}")
                    else:
                        # If we can't determine the type, try to infer from table position
                        # Usually Final Action comes first, then Dates for Filing
                        if result["final_action"] is None:
                            result["final_action"] = convert_visa_date(date_str)
                            print(
                                f"Set final_action to {result['final_action']} (inferred)"
                            )
                        elif result["dates_for_filing"] is None:
                            result["dates_for_filing"] = convert_visa_date(date_str)
                            print(
                                f"Set dates_for_filing to {result['dates_for_filing']} (inferred)"
                            )

        except (IndexError, ValueError) as e:
            print(f"Error processing table: {str(e)}")
            continue

    print(f"\nFinal result: {result}")
    return result


def main() -> None:
    rows = []
    for month, link in get_month_links():
        data = scrape_eb2_niw(link)
        data["source_url"] = link
        rows.append(data)
        print(f"✅ {month}: {data['final_action']} / {data['dates_for_filing']}")

    # Deduplicate by month (keep only first occurrence)
    deduped = []
    seen_months = set()
    for row in rows:
        m = row["month"]
        if m not in seen_months:
            deduped.append(row)
            seen_months.add(m)
        else:
            print(f"SKIPPING duplicate month: {m}")

    # Save to data.js (JS assignment)
    import json
    with open("data.js", "w") as f:
        f.write("const visaData = [\n")
        for i, row in enumerate(deduped):
            f.write("  " + json.dumps(row))
            if i < len(deduped) - 1:
                f.write(",")
            f.write("\n")
        f.write("];\n")

    print(f"\nTotal bulletins processed: {len(rows)}")
    print(f"Total unique months: {len(deduped)}")
    print("Data saved to: data.js")


if __name__ == "__main__":
    main()
