import SetsGrid from "~/pages/sets";
import type { Route } from "../+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Sets | FlashDeck" }];
}

export default function Sets() {
  return <SetsGrid />;
}