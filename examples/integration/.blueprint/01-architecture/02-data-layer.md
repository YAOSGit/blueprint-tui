---
title: Data Layer
teleport:
  file: src/db/store.ts
  line: 3
  highlight: UserStore
---

# Data Layer

Press `o` to teleport to the data store. You'll land on the `UserStore` class definition.

## Design Decisions

The store uses an **in-memory Map** for simplicity. In a real project, this would be backed by a database, but the interface stays the same:

- `getAll()` -- returns all records
- `getById(id)` -- returns a single record or `undefined`
- `create(data)` -- assigns an ID and stores the record
- `delete(id)` -- removes a record, returns whether it existed

This separation between routes and storage means you can swap the backing store without touching the route handlers.
