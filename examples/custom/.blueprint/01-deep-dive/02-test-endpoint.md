---
title: Test the Endpoint
actions:
  - label: Test /health
    command: curl -s http://localhost:3456/health
  - label: Test /api/greet
    command: curl -s http://localhost:3456/api/greet?name=Developer
validate:
  command: curl -sf http://localhost:3456/health
  hint: Make sure the dev server is running (go back to the Setup chapter).
---

# Test the Live Endpoint

If the dev server from the previous chapter is still running, you can test it here.

This step has **two actions** -- use `Tab` to focus the action list, then arrow keys to select which endpoint to test.

Press `v` to validate that the server is responding on `/health`.
