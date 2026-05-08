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

Let's start by installing the project dependencies.

This is a **required step** -- the tour won't let you proceed until `node_modules/` exists. This ensures you don't hit confusing errors in later steps.

Press `r` to install, then `v` to validate.
