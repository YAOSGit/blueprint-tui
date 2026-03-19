---
title: Teleport
teleport:
  file: src/utils/teleport/index.ts
  line: 10
---

# Editor Teleport

## How the command is built

The `buildTeleportCommand` function at line 10 translates a teleport target (file + line) into an editor-specific command. It supports VS Code/Codium/Cursor (`--goto file:line`), JetBrains IDEs (`--line N file`), Vim/Neovim (`+N file`), and a generic fallback (`file:line`).

## How execution works

The `executeTeleport` function at line 34 spawns the editor process detached so it does not block the TUI. The child process is immediately `unref()`'d and its stdio is set to `ignore`. If spawning fails, it returns an error result instead of throwing.

## What to do

Press `o` to teleport to the teleport builder.
