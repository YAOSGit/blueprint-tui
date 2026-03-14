# Basic Example -- Minimal Tour

This example demonstrates the simplest use of blueprint-tui: a single-chapter tour with two steps that walk a new developer through a tiny project.

## What it does

The `.blueprint/` directory defines a tour called "Hello App" with one chapter and two steps:

| Step | Title | Features Used |
|------|-------|---------------|
| 01 | Welcome | Teleport to `src/index.ts:1` |
| 02 | Try It Out | One-shot action (`node src/index.ts`) |

## Setup

No additional setup required -- just point blueprint-tui at the example directory.

```bash
npx blueprint-tui examples/basic/.blueprint
```

Or if installed globally:

```bash
blueprint-tui examples/basic/.blueprint
```

## Try it out

```bash
$ npx blueprint-tui examples/basic/.blueprint
# Opens the TUI with the Hello App tour
# Press o to teleport to src/index.ts in your editor
# Press -> to move to the next step
# Press r to run the action
# Press q to quit
```

You can also validate the tour without launching the TUI:

```bash
$ npx blueprint-tui validate examples/basic/.blueprint
# Output: Valid tour: Hello App (1 chapters, 2 steps)
```

Or print the outline:

```bash
$ npx blueprint-tui list examples/basic/.blueprint
# Output:
# Hello App v1.0.0
# [welcome] Welcome
#   . Welcome
#   . Try It Out
```

## Files included

- `.blueprint/blueprint.yaml` -- Tour metadata (name, version, author).
- `.blueprint/00-welcome/chapter.yaml` -- Chapter metadata.
- `.blueprint/00-welcome/01-welcome.md` -- Step with a teleport to `src/index.ts`.
- `.blueprint/00-welcome/02-try-it-out.md` -- Step with a runnable action.
- `src/index.ts` -- Minimal TypeScript file used as a teleport target.
