---
title: API Handler
teleport:
  file: src/api/handler.ts
  line: 5
  highlight: handleRequest
actions:
  - label: Run handler test
    command: node -e "const { handleRequest } = require('./src/api/handler.ts'); console.log(handleRequest('/health'));"
---

# The Request Handler

Press `o` to teleport to the handler file. Your editor will open at **line 5**, where `handleRequest` is defined.

The handler uses a simple route map to dispatch requests. Each route returns a response object with a `status` and `body`.

Press `r` to run a quick test of the handler function.
