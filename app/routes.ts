import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("", "routes/index.tsx", [
    route("", "pages/layout/index.tsx", [
      route("sets", "pages/sets/index.tsx", []),
      route("folders", "pages/folders/index.tsx", []),
    ]),
  ]),
] satisfies RouteConfig;
