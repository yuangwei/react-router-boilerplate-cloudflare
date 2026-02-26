import { Hono } from "hono";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { createRequestHandler } from "react-router";
import api from "@/api/index.js";
import queue from "./queue";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

const app = new Hono<{
  Bindings: Env;
}>()
  .use(requestId())
  .use(logger())
  .route("/api", api)
  .all("*", async (c) => {
    return requestHandler(c.req.raw, {
      cloudflare: { env: c.env, ctx: c.executionCtx },
    });
  });

const fetch = app.fetch;

export default {
  fetch,
  queue,
} satisfies ExportedHandler<Env>;
