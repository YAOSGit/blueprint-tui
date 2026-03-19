---
title: Walker
teleport:
  file: src/utils/loader/walker.ts
  line: 34
---

# Blueprint Walker

## How discovery works

The `walkBlueprint` function at line 34 is the filesystem discovery layer. It reads `blueprint.yaml` from the root, validates it against `BlueprintMetaSchema`, then scans for subdirectories sorted alphabetically to discover chapters.

## How chapters and steps are collected

For each chapter directory it reads `chapter.yaml`, validates with `ChapterMetaSchema`, then collects all `.md` files sorted by name. The numeric prefixes (e.g. `01-`, `02-`) control ordering but are stripped from the resulting IDs via `stripPrefix`. The output is a `RawTour` containing raw markdown content ready for frontmatter parsing.

## What to do

Press `o` to teleport to the `walkBlueprint` function.
