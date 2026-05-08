// src/routes/users.ts
// Route handler for /users endpoints.

import type http from 'node:http';
import type { UserStore } from '../db/store.ts';

type RouteResult = { status: number; body: string };

export function handleUsers(
	req: http.IncomingMessage,
	store: UserStore,
): Promise<RouteResult> {
	const method = req.method ?? 'GET';
	const url = new URL(req.url ?? '/', `http://${req.headers.host}`);
	const segments = url.pathname.split('/').filter(Boolean);
	const id = segments.length > 1 ? Number(segments[1]) : undefined;

	if (method === 'GET' && id === undefined) {
		return Promise.resolve({
			status: 200,
			body: JSON.stringify(store.getAll()),
		});
	}

	if (method === 'GET' && id !== undefined) {
		const user = store.getById(id);
		if (!user) {
			return Promise.resolve({ status: 404, body: '{"error":"Not found"}' });
		}
		return Promise.resolve({ status: 200, body: JSON.stringify(user) });
	}

	if (method === 'POST') {
		return new Promise((resolve) => {
			let body = '';
			req.on('data', (chunk: Buffer) => {
				body += chunk.toString();
			});
			req.on('end', () => {
				const input = JSON.parse(body);
				const user = store.create(input);
				resolve({ status: 201, body: JSON.stringify(user) });
			});
		});
	}

	if (method === 'DELETE' && id !== undefined) {
		const deleted = store.delete(id);
		const status = deleted ? 204 : 404;
		const body = deleted ? '' : '{"error":"Not found"}';
		return Promise.resolve({ status, body });
	}

	return Promise.resolve({
		status: 405,
		body: '{"error":"Method not allowed"}',
	});
}
