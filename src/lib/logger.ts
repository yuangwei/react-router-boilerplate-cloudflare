import type { MiddlewareHandler } from "hono";

/**
 * Custom logger middleware for Cloudflare Workers
 * Captures all request/response logs with requestIP and requestID
 */
export const logger = (): MiddlewareHandler => {
	return async (c, next) => {
		const requestId =
			c.get("requestId") || c.req.header("x-request-id") || "unknown";

		const start = Date.now();

		// Log request
		console.log(
			JSON.stringify({
				type: "request",
				requestId,
				method: c.req.method,
				path: c.req.path,
			}),
		);

		try {
			await next();
		} catch (err) {
			// Log error
			console.error(
				JSON.stringify({
					type: "error",
					requestId,
					method: c.req.method,
					path: c.req.path,
					error: err instanceof Error ? err.message : String(err),
				}),
			);
			throw err;
		}

		// Log response
		const duration = Date.now() - start;
		const res = c.res;

		console.log(
			JSON.stringify({
				type: "response",
				requestId,
				method: c.req.method,
				path: c.req.path,
				status: res.status,
				duration,
			}),
		);
	};
};
