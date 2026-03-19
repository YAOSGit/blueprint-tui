---
title: Frontmatter Parser
teleport:
  file: src/utils/loader/frontmatterParser.ts
  line: 13
---

# Frontmatter Parsing

## How it works

The `parseFrontmatter` function at line 13 takes raw markdown content and splits it into YAML frontmatter and body text. It delegates to the toolkit's `parseFrontmatter` utility which uses gray-matter under the hood.

## How validation works

The extracted YAML is validated against `StepFrontmatterSchema` (a Zod schema requiring `title`, with optional `teleport`, `actions`, `validate`, and `required` fields). If the frontmatter fails validation, a descriptive error is thrown with the exact Zod issue. The result is a `ParsedStep` with typed `frontmatter` and the remaining markdown `body`.

## What to do

Press `o` to teleport to the frontmatter parser.
