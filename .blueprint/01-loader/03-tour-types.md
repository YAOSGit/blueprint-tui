---
title: Tour Types
teleport:
  file: src/types/Tour/index.ts
  line: 1
---

# The Tour Type System

## How it is structured

All tour data is modeled with Zod schemas that double as runtime validators and TypeScript type sources. The file defines three layers: frontmatter schemas (`TeleportSchema`, `ActionSchema`, `ValidateSchema`, `StepFrontmatterSchema`), metadata schemas (`ChapterMetaSchema`, `BlueprintMetaSchema`), and resolved schemas (`ResolvedStepSchema`, `ResolvedChapterSchema`, `ResolvedTourSchema`).

## How types are derived

The resolved types extend the raw schemas with runtime-only fields like `id`, `body`, and `filePath`. TypeScript types are inferred with `z.infer<>` so there is a single source of truth -- change the schema and the types update automatically.

## What to do

Press `o` to teleport to the type definitions.
