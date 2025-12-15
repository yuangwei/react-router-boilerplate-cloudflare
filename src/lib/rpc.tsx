import type { AppType } from "@/api";

import { hc } from "hono/client";

const rpcClient = hc<AppType>("/");

export default rpcClient;
