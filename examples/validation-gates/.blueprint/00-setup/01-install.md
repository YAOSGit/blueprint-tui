---
title: Install Dependencies
actions:
  - label: Install
    command: npm install
validate:
  command: test -f package.json
  hint: Press r to run npm install first.
required: true
---

# Install Dependencies

Before we explore the codebase, let's make sure dependencies are installed.

Press `r` to run `npm install`. This is a **required step** -- you must pass validation before moving forward.

After install completes, press `v` to verify that `node_modules/` exists.
