---
title: Overview
teleport:
  file: src/app/cli.ts
  line: 9
---

# blueprint-tui Overview

## What it is

You are reading a blueprint tour about blueprint-tui itself. This project provides an interactive codebase onboarding TUI that renders `.blueprint/` directories as guided, step-by-step tours with teleport, actions, and validation.

## How it boots

The CLI entry point at line 9 defines two commands: `validate` (checks a `.blueprint/` directory for correctness) and `list` (prints the tour outline). The TUI entry lives in `src/app/tui.tsx` and renders the full interactive experience.

## What to do

Press `o` to teleport to the CLI entry point.
