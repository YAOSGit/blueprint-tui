# Integration Example -- Full Project Onboarding Tour

Full integration setup demonstrating a realistic multi-chapter onboarding tour for a Node.js API project. Covers environment setup, architecture walkthrough, and feature exploration with validation gates at each stage.

## What This Shows

- **Multi-chapter tours**: three chapters progressing from setup to architecture to features
- **Validation-gated progression**: required steps ensure each stage is complete before moving on
- **Persistent dev server**: a long-running process that stays alive across chapters
- **Cross-file teleportation**: jump between routes, database layer, and test files
- **Multiple actions per step**: run tests, start servers, and check health in one step

## Tour Structure

| Chapter | Steps | Description |
|---------|-------|-------------|
| Environment | 2 | Install dependencies, start the server |
| Architecture | 2 | Explore the route handler and database layer |
| Features | 2 | Run the test suite, test the live API |

## How to Run

### Start the tour

```bash
cd examples/integration
npx blueprint-tui
```

Or from the project root:

```bash
npx blueprint-tui examples/integration/.blueprint
```

### Validate the tour structure

```bash
npx blueprint-tui validate examples/integration/.blueprint
```

### Print the outline

```bash
npx blueprint-tui list examples/integration/.blueprint
```

## Files included

- `.blueprint/` -- Three-chapter tour with 6 steps total.
- `src/routes/users.ts` -- Route handler with CRUD operations.
- `src/db/store.ts` -- In-memory data store with typed operations.
- `src/server.ts` -- HTTP server entry point.
- `test/users.test.ts` -- Test file for the route handler.
- `package.json` -- Package manifest with test and start scripts.
