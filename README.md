<p align="center">
  <a href="https://github.com/YAOSGit/blueprint-tui">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/YAOSGit/.github/main/profile/images/blueprint-tui.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/YAOSGit/.github/main/profile/images/blueprint-tui-light.svg">
      <img src="https://raw.githubusercontent.com/YAOSGit/.github/main/profile/images/blueprint-tui.svg" width="100%" alt="blueprint-tui" />
    </picture>
  </a>
</p>

<p align="center">
  <strong>Interactive codebase onboarding TUI -- turn docs into executable journeys</strong>
</p>

<div align="center">

![Node Version](https://img.shields.io/badge/NODE-18+-16161D?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=%235FA04E)
![TypeScript Version](https://img.shields.io/badge/TYPESCRIPT-5.9-16161D?style=for-the-badge&logo=typescript&logoColor=white&labelColor=%233178C6)
![React Version](https://img.shields.io/badge/REACT-19.2-16161D?style=for-the-badge&logo=react&logoColor=black&labelColor=%2361DAFB)

![Uses Ink](https://img.shields.io/badge/INK-16161D?style=for-the-badge&logo=react&logoColor=white&labelColor=%2361DAFB)
![Uses Zod](https://img.shields.io/badge/ZOD-16161D?style=for-the-badge&logo=zod&logoColor=white&labelColor=%233E67B1)
![Uses Vitest](https://img.shields.io/badge/VITEST-16161D?style=for-the-badge&logo=vitest&logoColor=white&labelColor=%236E9F18)
![Uses Biome](https://img.shields.io/badge/BIOME-16161D?style=for-the-badge&logo=biome&logoColor=white&labelColor=%2360A5FA)

</div>

---

## Table of Contents

### Getting Started

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [CLI Usage](#cli-usage)

### Features

- [Two-Pane Layout](#two-pane-layout)
- [Teleport](#teleport)
- [Actions and Validation](#actions-and-validation)
- [Jump Navigation](#jump-navigation)

### Authoring

- [Blueprint Format](#blueprint-format)
- [Step Frontmatter](#step-frontmatter)

### Development

- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)

---

## Overview

**blueprint-tui** is an interactive terminal UI for guided codebase onboarding. Define a `.blueprint/` directory in your repo with chapters and steps written in Markdown, and blueprint-tui renders them as an executable journey -- complete with file teleportation, runnable actions, and validation checks.

### What Makes This Project Unique

- **Docs That Do Things**: Steps aren't just text -- they open files in your editor, run commands, and verify completion
- **Editor-Aware Teleport**: Detects VS Code, JetBrains IDEs, Neovim, and Vim -- opens files at exact line numbers
- **Two-Pane TUI**: Narrative on the left, actions and process output on the right -- no context switching
- **Validation Gates**: Required steps must pass a validation command before the tour continues
- **Zero Config**: Drop a `.blueprint/` directory in any repo and run `blueprint-tui`

---

## Installation

```bash
# Install globally from npm
npm install -g @yaos-git/blueprint-tui

# Or install as a dev dependency
npm install -D @yaos-git/blueprint-tui
```

### From Source

```bash
# Clone the repository
git clone https://github.com/YAOSGit/blueprint-tui.git
cd blueprint-tui

# Install dependencies
npm install

# Build the project
npm run build

# Link globally (optional)
npm link
```

---

## Quick Start

```bash
# Run a tour from the current directory
blueprint-tui

# Point at a specific .blueprint/ directory
blueprint-tui ./path/to/.blueprint

# Jump straight to a chapter and step
blueprint-tui --jump architecture:data-layer
```

The TUI will parse the `.blueprint/` directory, validate all schemas and teleport targets, then render an interactive two-pane tour.

---

## CLI Usage

```text
blueprint-tui [path]                          Open a .blueprint/ tour (defaults to .blueprint)
blueprint-tui --jump <chapter:step>           Jump directly to a step
blueprint-tui --editor <editor>               Override editor detection
blueprint-tui validate [path]                 Validate .blueprint/ without launching TUI
blueprint-tui list [path]                     Print tour outline to stdout
blueprint-tui --help, -h                      Show help message
blueprint-tui --version, -v                   Show version information
```

### Examples

```bash
# Run the tour in the current repo
blueprint-tui

# Validate the blueprint structure (for CI)
blueprint-tui validate

# Print the tour outline
blueprint-tui list

# Jump to a specific step
blueprint-tui --jump getting-started:setup

# Override editor (default: auto-detected)
blueprint-tui --editor nvim
```

---

## Two-Pane Layout

The TUI is organized into two panes:

### Narrative Pane (Left, 55%)

- Renders step Markdown with terminal-native formatting via marked + marked-terminal
- Scrollable content with keyboard navigation
- Visual focus indicator (bold cyan border when active)

### Activity Pane (Right, 45%)

- Action list with selectable items for steps with multiple actions
- Live process output for running commands (one-shot and persistent)
- Validation status with pass/fail indicators and hints
- Process output scrolling with keyboard navigation

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `<-` / `h` | Previous step |
| `->` / `l` | Next step |
| `[` | Previous chapter |
| `]` | Next chapter |
| `o` | Teleport -- open file in IDE |
| `r` | Run action |
| `v` | Run validation |
| `j` | Jump to step |
| `Tab` | Cycle pane focus |
| `Up` / `Down` | Scroll focused pane |
| `?` | Show help overlay |
| `q` | Quit |

---

## Teleport

Each step can specify a `teleport` target -- a file and line number to open in the user's editor. blueprint-tui auto-detects the editor or accepts an override via `--editor` or the `editor` field in `blueprint.yaml`.

Supported editors:

| Editor | Detection | Open Command |
|--------|-----------|-------------|
| VS Code | `code` | `code --goto file:line` |
| JetBrains (IntelliJ, WebStorm, GoLand) | `idea`, `webstorm`, `goland` | `idea --line N file` |
| Neovim | `nvim` | `nvim +N file` |
| Vim | `vim` | `vim +N file` |
| Other | binary name | `editor file:line` |

---

## Actions and Validation

### Actions

Steps can define one or more runnable shell commands:

- **One-shot actions**: Run to completion, capture stdout/stderr, report exit code
- **Persistent actions**: Spawn long-running processes (e.g., dev servers) with SIGTERM/SIGKILL cleanup

### Validation

Steps can include a validation command that determines whether the step was completed successfully. Required steps block progression until validation passes. A hint is shown when validation fails.

---

## Jump Navigation

Press `j` to open the jump overlay -- a full-screen view of all chapters and steps with the current position highlighted. Select any step to jump directly to it.

---

## Blueprint Format

A `.blueprint/` directory follows this structure:

```
.blueprint/
├── blueprint.yaml                    # Tour metadata
├── 00-getting-started/               # Chapter (prefix for ordering)
│   ├── chapter.yaml                  # Chapter metadata
│   ├── 01-overview.md                # Step (prefix for ordering)
│   └── 02-setup.md                   # Step
└── 01-architecture/                  # Chapter
    ├── chapter.yaml
    └── 01-data-layer.md              # Step
```

### blueprint.yaml

```yaml
name: My Project Tour
version: 1.0.0
author: Team Name
editor: code          # Optional: override editor detection
```

### chapter.yaml

```yaml
title: Getting Started
description: First steps with the project.
```

---

## Step Frontmatter

Each step is a Markdown file with YAML frontmatter:

```markdown
---
title: Setup
teleport:
  file: src/index.ts
  line: 1
  highlight: "createApp"    # Optional: search term
actions:
  - label: Install deps
    command: npm install
  - label: Start dev server
    command: npm run dev
    persistent: true         # Long-running process
validate:
  command: npm test
  hint: Run npm install first
required: true               # Must pass validation to proceed
---

# Setup

Install dependencies and run the tests to verify your environment.
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | yes | Step title shown in header and jump overlay |
| `teleport` | object | no | File and line to open in editor |
| `teleport.file` | string | yes (if teleport) | Relative path from project root |
| `teleport.line` | number | no | Line number (default: 1) |
| `teleport.highlight` | string | no | Search term for the editor |
| `actions` | array | no | Shell commands to run |
| `actions[].label` | string | yes (if actions) | Display label for the action |
| `actions[].command` | string | yes (if actions) | Shell command to execute |
| `actions[].persistent` | boolean | no | Keep process running (default: false) |
| `validate` | object | no | Validation command |
| `validate.command` | string | yes (if validate) | Shell command that must exit 0 |
| `validate.hint` | string | yes (if validate) | Help text shown on failure |
| `required` | boolean | no | Block progression until validated (default: false) |

---

## Available Scripts

### Development Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run TypeScript checking + test watcher concurrently |
| `npm run dev:typescript` | Run TypeScript type checking in watch mode |
| `npm run dev:test` | Run Vitest in watch mode |

### Build Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Bundle the CLI with esbuild |

### Lint Scripts

| Script | Description |
|--------|-------------|
| `npm run lint` | Run type checking, linting, formatting, and audit |
| `npm run lint:check` | Check code for linting issues with Biome |
| `npm run lint:fix` | Check and fix linting issues with Biome |
| `npm run lint:format` | Format all files with Biome |
| `npm run lint:types` | Run TypeScript type checking only |
| `npm run lint:audit` | Run npm audit |

### Testing Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests (unit, react, types, e2e) |
| `npm run test:unit` | Run unit tests |
| `npm run test:react` | Run React component tests |
| `npm run test:types` | Run type-level tests |
| `npm run test:e2e` | Build and run end-to-end tests |

---

## Tech Stack

### Core

- **[React 19](https://react.dev/)** -- UI component library
- **[Ink 6](https://github.com/vadimdemedes/ink)** -- React for CLIs
- **[TypeScript 5](https://www.typescriptlang.org/)** -- Type-safe JavaScript
- **[Zod](https://zod.dev/)** -- Runtime schema validation for tour data
- **[marked](https://marked.js.org/)** + **[marked-terminal](https://github.com/mikaelbr/marked-terminal)** -- Markdown rendering in the terminal
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** -- Frontmatter parsing
- **[yaml](https://eemeli.org/yaml/)** -- YAML parsing for blueprint and chapter metadata

### Build and Development

- **[esbuild](https://esbuild.github.io/)** -- Fast bundler
- **[Vitest](https://vitest.dev/)** -- Unit testing framework
- **[Biome](https://biomejs.dev/)** -- Linter and formatter

### UI

- **[Chalk](https://github.com/chalk/chalk)** -- Terminal string styling

---

## Project Structure

```
blueprint-tui/
├── src/
│   ├── app/                       # Application entry points
│   │   ├── cli.tsx                # CLI entry point (Commander)
│   │   ├── app.tsx                # Main two-pane layout
│   │   ├── index.tsx              # React app root
│   │   └── providers.tsx          # Provider wrapper
│   ├── components/                # React (Ink) components
│   │   ├── ActionList/            # Action buttons in activity pane
│   │   ├── ActivityPane/          # Right pane -- actions + process output
│   │   ├── Header/                # Tour name, chapter, step counter
│   │   ├── HelpOverlay/           # Keyboard shortcut reference
│   │   ├── JumpOverlay/           # Chapter:step quick navigation
│   │   ├── NarrativePane/         # Left pane -- Markdown rendering
│   │   ├── ProcessOutput/         # Live command output display
│   │   ├── ProgressFooter/        # Step stepper and shortcut bar
│   │   └── ValidationStatus/      # Pass/fail indicator with hints
│   ├── hooks/                     # React hooks
│   │   ├── useCommands/           # Keyboard command registry
│   │   ├── useMarkdown/           # Markdown rendering via marked
│   │   ├── useProcess/            # Process state management
│   │   ├── useTour/               # Tour navigation state
│   │   └── useUIState/            # UI focus and overlay state
│   ├── loader/                    # .blueprint/ directory parser
│   │   ├── frontmatterParser.ts   # YAML frontmatter extraction
│   │   └── walker.ts              # Directory traversal and validation
│   ├── providers/                 # React context providers
│   │   ├── CommandsProvider/      # Keyboard command registry
│   │   ├── ProcessProvider/       # Process spawning and lifecycle
│   │   ├── TourProvider/          # Tour state and navigation
│   │   └── UIStateProvider/       # Focus, scroll, and overlay state
│   ├── runner/                    # Command execution
│   │   ├── oneShot.ts             # Run-to-completion commands
│   │   └── persistent.ts          # Long-running process management
│   ├── teleport/                  # Editor integration
│   │   ├── editorDetector.ts      # Auto-detect installed editor
│   │   └── index.ts               # Build and execute editor commands
│   └── types/                     # TypeScript type definitions
│       ├── Process/               # Process state types
│       ├── Tour/                  # Tour, Chapter, Step Zod schemas
│       └── Validation/            # Validation result types
├── test/
│   └── fixtures/                  # Test fixture .blueprint/ directories
├── biome.json                     # Biome configuration
├── tsconfig.json                  # TypeScript configuration
├── vitest.unit.config.ts          # Unit test configuration
├── vitest.react.config.ts         # React test configuration
├── vitest.type.config.ts          # Type test configuration
├── vitest.e2e.config.ts           # E2E test configuration
├── esbuild.config.js              # esbuild bundler configuration
└── package.json
```

---

## Versioning

This project uses a custom versioning scheme: `MAJORYY.MINOR.PATCH`

| Part | Description | Example |
|------|-------------|---------|
| `MAJOR` | Major version number | `1` |
| `YY` | Year (last 2 digits) | `26` for 2026 |
| `MINOR` | Minor version | `0` |
| `PATCH` | Patch version | `0` |

**Example:** `126.0.0` = Major version 1, released in 2026, minor 0, patch 0

---

## Style Guide

Conventions for contributing to this project. All rules are enforced by code review; Biome handles formatting and lint.

### Exports

- **Named exports only** -- no `export default`. Every module uses `export function`, `export const`, or `export type`.
- **`import type`** -- always use `import type` for type-only imports.
- **`.js` extensions** -- all relative imports use explicit `.js` extensions (ESM requirement).

### File Structure

```
src/
├── app/              # Entry points and root component
├── components/       # React components (PascalCase directories)
│   └── MyComponent/
│       ├── index.tsx
│       ├── MyComponent.types.ts
│       └── MyComponent.test.tsx
├── hooks/            # React hooks (camelCase directories)
│   └── useMyHook/
│       ├── index.ts
│       └── useMyHook.test.ts
├── providers/        # React context providers (PascalCase directories)
│   └── MyProvider/
│       ├── index.tsx
│       ├── MyProvider.types.ts
│       └── MyProvider.test.tsx
├── types/            # Shared type definitions (PascalCase directories)
│   └── MyType/
│       ├── index.ts
│       └── MyType.test-d.ts
└── utils/            # Pure utility functions (camelCase directories)
    └── myUtil/
        ├── index.ts
        └── myUtil.test.ts
```

### Components and Providers

- **Components** use `function` declarations: `export function MyComponent(props: MyComponentProps) {}`
- **Providers** use `React.FC` arrow syntax: `export const MyProvider: React.FC<Props> = ({ children }) => {}`
- **Props** are defined in a co-located `.types.ts` file using the `interface` keyword.
- Components receive data via props -- never read `process.stdout` or global state directly.

### Types

- Use `type` for data shapes and unions. Use `interface` for component props.
- Shared types live in `src/types/TypeName/index.ts` with a co-located `TypeName.test-d.ts`.
- Local types live in co-located `.types.ts` files -- never inline in implementation files.
- No duplicate type definitions -- import from the canonical source.

### Constants

- Named constants go in `.consts.ts` files (e.g., `MyComponent.consts.ts`).
- No magic numbers in implementation files -- extract to named constants.
- Cross-component constants belong in `src/utils/`, not in a specific component's `.consts.ts`.

### Testing

- Every module has a co-located test file.
- Components: `ComponentName.test.tsx`
- Utils: `utilName.test.ts`
- Types: `TypeName.test-d.ts` (type-level tests using `expectTypeOf`/`assertType`)

---

## License

ISC
