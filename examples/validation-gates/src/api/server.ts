// src/api/server.ts
// Minimal HTTP server for the custom example tour.

import http from 'node:http';
import url from 'node:url';
import { handleRequest } from './handler.ts';

const PORT = 3456;

const server = http.createServer((req, res) => {
	const parsed = url.parse(req.url ?? '/', true);
	const path = parsed.pathname ?? '/';
	const query = parsed.query as Record<string, string>;

	const result = handleRequest(path, query);
	res.writeHead(result.status, { 'Content-Type': 'application/json' });
	res.end(result.body);
});

server.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
