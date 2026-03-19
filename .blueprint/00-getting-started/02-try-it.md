---
title: Try It
actions:
  - label: Validate the basic example tour
    command: node dist/cli.js validate examples/basic
---

# Try the Validator

## What to expect

Run the `validate` command against the bundled `examples/basic` tour. It loads the `.blueprint/` directory, parses `blueprint.yaml`, discovers chapters and steps, validates all YAML frontmatter with Zod schemas, and reports whether the tour is valid.

## How to read the output

If validation passes you will see the tour name, chapter count, and step count. If it fails you will see which file has the issue and what went wrong.

## What to do

Press `r` to execute the validation action.
