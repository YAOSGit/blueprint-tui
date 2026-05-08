// src/server.ts
// HTTP server entry point.

import http from 'node:http';
import { UserStore } from './db/store.ts';
import { handleUsers } from './routes/users.ts';

const PORT = 3789;
const store = new UserStore();

const server = http.createServer(async (req, res) => {
	const url = req.url ?? '/';

	if (url === '/health') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end('{"ok":true}');
		return;
	}

	if (url.startsWith('/users')) {
		const result = await handleUsers(req, store);
		res.writeHead(result.status, { 'Content-Type': 'application/json' });
		res.end(result.body);
		return;
	}

	res.writeHead(404, { 'Content-Type': 'application/json' });
	res.end('{"error":"Not found"}');
});

server.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
	console.log('Endpoints: GET/POST /users, GET/DELETE /users/:id, GET /health');
});
