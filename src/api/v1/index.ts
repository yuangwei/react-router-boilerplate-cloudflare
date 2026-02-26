import { Hono } from "hono";
import auth from "./auth";

const v1Api = new Hono();

v1Api.route("/auth", auth)

export default v1Api;
