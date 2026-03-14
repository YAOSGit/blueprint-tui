---
title: Start Dev Server
actions:
  - label: Start server
    command: node src/api/server.ts
    persistent: true
  - label: Check health
    command: curl -s http://localhost:3456/health || echo "Server not responding"
---

# Start the Dev Server

This step demonstrates **persistent actions**. The dev server will keep running in the background while you continue the tour.

Press `r` to start the server. Then use `Tab` to switch focus to the action list, select "Check health", and press `r` again to verify it's running.

Notice the process output stays visible in the activity pane.
