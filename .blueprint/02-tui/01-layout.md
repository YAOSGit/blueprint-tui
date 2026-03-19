---
title: Layout
teleport:
  file: src/app/app.tsx
  line: 37
---

# Two-Pane Layout

## How it works

The `AppContent` function at line 37 is the main TUI layout. It uses toolkit's `TUILayout` for the outer shell (header, footer, overlays) and `SplitPane` with a 55/45 horizontal ratio to divide the screen into a `NarrativePane` (left, renders step markdown) and an `ActivityPane` (right, shows actions, process output, and validation results).

## Key state sources

Navigation state comes from `useTour`, process management from `useProcess`, and UI state (scroll offsets, focus pane, overlays) from `useUIState`. The footer displays progress stepper dots showing which steps have been visited or validated.

## What to do

Press `o` to teleport to the AppContent component.
