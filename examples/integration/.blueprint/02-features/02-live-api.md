---
title: Live API
actions:
  - label: Create user
    command: "curl -s -X POST http://localhost:3789/users -H 'Content-Type: application/json' -d '{\"name\":\"Alice\",\"email\":\"alice@example.com\"}'"
  - label: List users
    command: curl -s http://localhost:3789/users
  - label: Health check
    command: curl -sf http://localhost:3789/health && echo "OK" || echo "Server not running"
validate:
  command: curl -sf http://localhost:3789/health
  hint: Make sure the server is running (go back to the Environment chapter).
---

# Test the Live API

If the server from the Environment chapter is still running, you can interact with it here.

Use `Tab` to focus the action list, then arrow keys to select an action:

1. **Create user** -- POST a new user and see the response with the assigned ID
2. **List users** -- GET all users to see the one you just created
3. **Health check** -- verify the server is responding

Press `v` to validate that the server is healthy. If it's not running, press `[` to go back to the Environment chapter and restart it.

---

Congratulations -- you've completed the onboarding tour!
