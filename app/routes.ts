import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("", "routes/index.tsx", [
    route("", "routes/layout.tsx", [
      route("sets", "routes/sets/index.tsx"),
      route("folders", "routes/folders/index.tsx"),
    ]),
    route("folders/:folderId", "routes/folders/folderId.tsx"),
    route("sets/:setId", "routes/sets/setId.tsx"),
  ]),
  route("sets/:setId/study", "routes/sets/setId-study.tsx"),
] satisfies RouteConfig;
