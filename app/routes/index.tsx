import type { Route } from "./+types/index";
import IndexPage from "~/pages/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "FlashDeck" }];
}

export default function Index() {
  return <IndexPage />
}
