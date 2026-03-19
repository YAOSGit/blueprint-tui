# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [126.1.0] - 2026-03-19

### Added

- `Header` uses `width="100%"` for full-width rendering
- `--help` e2e test

### Changed

- Theme architecture: `ThemeProvider` replaced with plain `theme.ts` export
- `CommandsProvider` uses `React.FC` pattern
- `JumpOverlay` uses `theme.brand` instead of hardcoded `"cyan"`
- `frontmatterParser` `as any` replaced with proper type cast
- Utilities moved to `src/utils/` (loader, runner, teleport)
- Toolkit bumped to 0.0.26-3-19a
- Biome updated to 2.4.8

### Fixed

- Version test: corrected CLI name assertion

## [126.0.0] - 2026-03-13

### Added

- Two-pane TUI for interactive codebase onboarding with narrative and activity panes
- `.blueprint/` directory format with YAML metadata and Markdown frontmatter steps
- Teleport system with editor detection for VS Code, JetBrains IDEs, Neovim, and Vim
- One-shot and persistent command runners for step actions
- Step validation with configurable commands and hints
- Jump overlay for quick navigation to any chapter:step
- In-terminal Markdown rendering via marked + marked-terminal
- `validate` subcommand for checking `.blueprint/` structure without launching TUI
- `list` subcommand for printing tour outline
- Zod schemas for all tour data types with runtime validation
- Progress footer with step-by-step stepper and keyboard shortcut display
