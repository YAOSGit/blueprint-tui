---
title: Start the Server
teleport:
  file: src/server.ts
  line: 1
actions:
  - label: Start server
    command: node src/server.ts
    persistent: true
  - label: Health check
    command: curl -sf http://localhost:3789/health && echo "OK" || echo "Not running"
---

# Start the Dev Server

Press `o` to view the server entry point in your editor. It's a minimal HTTP server that dispatches to route handlers.

Press `r` to start the server as a **persistent process** -- it will keep running in the background while you explore the codebase.

Use `Tab` to focus the action list, select "Health check", and press `r` to verify the server is responding.
