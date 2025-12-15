import { Hono } from "hono";

const app = new Hono()
	.get("/", async (c) => {
		return c.json({ message: "Hello World" });
	})
	.notFound((c) => c.json({ message: "404 Not found" }, 404))
	.onError((err, c) => {
		// @ts-ignore
		const status = err.status === 401 ? 401 : 500;
		return c.json(
			{ message: status === 401 ? "Unauthorized" : "Internal Server Error" },
			status,
		);
	});

export type AppType = typeof app;

export default app;
