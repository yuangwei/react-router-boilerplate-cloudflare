import { Hono, type Context } from "hono";
import { getAuth } from "@/lib/auth";


const app = new Hono();

app.all("*", (c: Context) => {
  const auth = getAuth(c.env);
	return auth.handler(c.req.raw);
});

export default app;