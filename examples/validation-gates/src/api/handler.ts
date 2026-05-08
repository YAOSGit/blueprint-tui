// src/api/handler.ts
// Simple request handler with route dispatching.

type Response = { status: number; body: string };

export function handleRequest(
	path: string,
	query?: Record<string, string>,
): Response {
	const routes: Record<string, () => Response> = {
		'/health': () => ({ status: 200, body: '{"ok":true}' }),
		'/api/greet': () => {
			const name = query?.name ?? 'World';
			return { status: 200, body: `{"message":"Hello, ${name}!"}` };
		},
	};

	const handler = routes[path];
	if (!handler) {
		return { status: 404, body: '{"error":"Not found"}' };
	}
	return handler();
}
