#!/usr/bin/env python3
"""Convert tester .docx files to Markdown."""

import sys
from pathlib import Path
from docx import Document
from docx.oxml.ns import qn
from docx.text.paragraph import Paragraph
from docx.table import Table


def cell_text(cell):
    return cell.text.strip().replace("|", "\\|")


def table_to_md(table):
    rows = []
    for i, row in enumerate(table.rows):
        cells = []
        prev = None
        for c in row.cells:
            txt = c.text.strip()
            if txt != prev:
                cells.append(cell_text(c))
                prev = txt
        rows.append("| " + " | ".join(cells) + " |")
        if i == 0:
            rows.append("|" + "---|" * len(cells))
    return "\n".join(rows)


def docx_to_markdown(docx_path: Path) -> str:
    doc = Document(docx_path)
    parts = []
    seen_tables = set()

    for child in doc.element.body:
        tag = child.tag.split("}")[-1]

        if tag == "p":
            p = Paragraph(child, doc)
            text = p.text.strip()
            if not text:
                continue
            style = p.style.name if p.style else ""
            if "Heading 1" in style:
                parts.append(f"# {text}")
            elif "Heading 2" in style:
                parts.append(f"## {text}")
            elif "Heading 3" in style:
                parts.append(f"### {text}")
            else:
                parts.append(text)

        elif tag == "tbl":
            tbl = Table(child, doc)
            tbl_id = id(child)
            if tbl_id not in seen_tables:
                seen_tables.add(tbl_id)
                parts.append("")
                parts.append(table_to_md(tbl))
                parts.append("")

    return "\n".join(parts)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        docx_path = Path(__file__).parent / "fromtester.docx"
    else:
        docx_path = Path(sys.argv[1])

    if not docx_path.exists():
        print(f"Error: {docx_path} not found", file=sys.stderr)
        sys.exit(1)

    md = docx_to_markdown(docx_path)
    out_path = docx_path.with_suffix(".md")
    out_path.write_text(md, encoding="utf-8")
    print(f"Written: {out_path}")
