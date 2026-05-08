# Custom Example -- Advanced Tour Features

This example demonstrates blueprint-tui's advanced features: persistent processes, validation gates, multiple actions per step, and editor override.

## What This Shows

- **Persistent actions**: long-running processes (like a dev server) that stay alive across steps
- **Validation gates**: required steps that block progression until a command exits 0
- **Multiple actions**: steps with more than one runnable command, selectable in the activity pane
- **Editor override**: specifying the editor in `blueprint.yaml` instead of relying on auto-detection

## Tour Structure

| Chapter | Step | Features |
|---------|------|----------|
| Setup | Install Dependencies | Validation gate (`npm install` must succeed) |
| Setup | Start Dev Server | Persistent action + one-shot health check |
| Deep Dive | API Handler | Teleport to `src/api/handler.ts:5`, multiple actions |
| Deep Dive | Test the Endpoint | One-shot action + validation |

## How to Run

```bash
npx blueprint-tui examples/custom/.blueprint --editor code
```

Or jump directly to the second chapter:

```bash
npx blueprint-tui examples/custom/.blueprint --jump deep-dive:api-handler
```

## Files included

- `.blueprint/blueprint.yaml` -- Tour metadata with `editor: code` override.
- `.blueprint/00-setup/` -- Chapter with install and dev server steps.
- `.blueprint/01-deep-dive/` -- Chapter with teleport, multiple actions, and validation.
- `src/api/handler.ts` -- API handler file used as a teleport target.
- `src/api/server.ts` -- Minimal HTTP server used as a persistent action target.
- `package.json` -- Package manifest for `npm install` validation.
