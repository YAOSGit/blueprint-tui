---
title: Route Handler
teleport:
  file: src/routes/users.ts
  line: 8
  highlight: handleUsers
---

# Route Handler

Press `o` to teleport to the route handler. The cursor will land on `handleUsers` at **line 8**.

## How Routing Works

The server dispatches incoming requests to handler functions based on the URL path. Each handler:

1. Parses the request method and URL
2. Delegates to the data store for persistence
3. Returns a JSON response with the appropriate status code

The route handler in `users.ts` supports four operations:

- **GET /users** -- list all users
- **POST /users** -- create a new user
- **GET /users/:id** -- get a user by ID
- **DELETE /users/:id** -- delete a user
