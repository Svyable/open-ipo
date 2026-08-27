#!/usr/bin/env python3
"""Validate public agent listing intents against the open-ipo schema.

A successful validation means only that an intent is structurally legible. It does
not verify factual claims, establish listing eligibility, or imply exchange approval.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = ROOT / "schemas" / "agent-listing-intent.schema.json"
INTENTS_DIR = ROOT / "intents"


def load_json(path: Path) -> object:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"{path.relative_to(ROOT)}: invalid JSON at line {exc.lineno}, "
            f"column {exc.colno}: {exc.msg}"
        ) from exc


def format_path(parts: object) -> str:
    rendered = "$"
    for part in parts:
        if isinstance(part, int):
            rendered += f"[{part}]"
        else:
            rendered += f".{part}"
    return rendered


def validate() -> int:
    schema = load_json(SCHEMA_PATH)
    Draft202012Validator.check_schema(schema)
    validator = Draft202012Validator(schema, format_checker=FormatChecker())

    intent_paths = sorted(INTENTS_DIR.glob("*.json"))
    if not intent_paths:
        print("No agent listing-intent JSON files found. Schema is valid.")
        return 0

    failures = 0
    for intent_path in intent_paths:
        try:
            payload = load_json(intent_path)
        except ValueError as exc:
            failures += 1
            print(f"FAIL {exc}")
            continue

        errors = sorted(validator.iter_errors(payload), key=lambda err: list(err.absolute_path))
        if not errors:
            print(f"PASS {intent_path.relative_to(ROOT)}")
            continue

        failures += 1
        print(f"FAIL {intent_path.relative_to(ROOT)}")
        for error in errors:
            print(f"  {format_path(error.absolute_path)}: {error.message}")

    if failures:
        print(
            f"\n{failures} listing-intent file(s) failed schema validation. "
            "Structural validation is required before an intent can enter the public registry."
        )
        return 1

    print(f"\nValidated {len(intent_paths)} listing-intent file(s).")
    return 0


if __name__ == "__main__":
    sys.exit(validate())
