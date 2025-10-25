import { auth } from "@/lib/auth"; // Adjust the path as necessary
import type { Route } from "../../+types/root";

export async function loader(request: Route.LoaderArgs) {
  return auth.handler(request);
}
export async function action(request: Route.LoaderArgs) {
  return auth.handler(request);
}
