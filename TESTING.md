# QA Tester Workflow

Reshma tests in Word. These scripts handle the conversion both ways so no manual reformatting is needed.

## Scripts

| Script | Direction | What it does |
|---|---|---|
| `docx_to_md.py` | .docx → .md | Converts Reshma's filled-in test doc to Markdown for reading |
| `generate_test_doc.py` | data → .docx | Generates the next round's test doc from the test cases defined inside it |

## Workflow per test round

```
1. Reshma returns her filled-in .docx (e.g. fromtester.docx)

2. Convert it to readable Markdown:
       python docx_to_md.py fromtester.docx
   Output: fromtester.md

3. Read results, make fixes.

4. Add new test cases to generate_test_doc.py (edit the TEST_CASES list).

5. Generate the next Word doc for Reshma:
       python generate_test_doc.py
   Output: fix_verification_test.docx  (or pass a custom name as argument)

6. Send fix_verification_test.docx to Reshma.
```

## Adding test cases

Open `generate_test_doc.py` and add entries to the `TEST_CASES` list:

```python
{
    "id": "TC-F09",
    "feature": "Short name for the feature",
    "steps": (
        "1. Do this.\n"
        "2. Then this."
    ),
    "expected": "What should happen.",
},
```

The script handles all Word formatting (table, colours, header, summary block) automatically.

## Requirements

```
pip install python-docx
```

Both scripts work with any .docx Reshma provides — not just the current one.
