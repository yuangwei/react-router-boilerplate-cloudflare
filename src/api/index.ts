import { Hono } from "hono";
import v1Api from "./v1";
import openApi from "./openapi";

const app = new Hono()
	.get("/", async (c) => {
		return c.json({ message: "Hello World" });
	})
	.route("/v1", v1Api)
	.route("/openapi", openApi)
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
