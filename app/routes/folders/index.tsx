import FoldersGrid from "~/pages/folders";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Folders | FlashDeck" }];
}

export default function Folders() {
  return <FoldersGrid />
}
