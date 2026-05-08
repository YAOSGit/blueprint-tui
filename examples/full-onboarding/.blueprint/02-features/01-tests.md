---
title: Test Suite
teleport:
  file: test/users.test.ts
  line: 1
actions:
  - label: Run tests
    command: node test/users.test.ts
validate:
  command: node test/users.test.ts
  hint: Tests should pass. Check the data store and route handler for issues.
required: true
---

# Test Suite

Press `o` to view the test file. It exercises the data store directly to verify CRUD operations.

Press `r` to run the tests. This is a **required step** -- all tests must pass before continuing.

The tests verify:
- Creating a user returns an ID
- Fetching by ID returns the correct user
- Listing returns all users
- Deleting removes the user
