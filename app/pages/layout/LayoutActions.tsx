import { Trash2, Database, Library, FolderOpen } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  usePopulateGermanCourse,
  usePopulateEnglishVerbs,
  useClearUserData,
} from "~/hooks/mutation-hooks";
import SetDialog from "../sets/SetDialog";
import { useLocation } from "react-router";
import FolderDialog from "../folders/FolderDialog";

export function LayoutActions() {
  const populateGerman = usePopulateGermanCourse();
  const populateEnglish = usePopulateEnglishVerbs();
  const clearData = useClearUserData();

  const isLoading =
    populateGerman.isPending ||
    populateEnglish.isPending ||
    clearData.isPending;

  const location = useLocation();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => {
          populateGerman.mutate();
          populateEnglish.mutate();
        }}
        disabled={isLoading}
      >
        <Database className="h-4 w-4" />
        Seed [dev]
      </Button>
      <Button
        variant="outline"
        className="gap-2 text-destructive hover:bg-destructive/10"
        onClick={() => {
          if (
            confirm(
              "Are you sure? This will delete all your folders, sets, cards, and progress."
            )
          ) {
            clearData.mutate();
          }
        }}
        disabled={isLoading}
      >
        <Trash2 className="h-4 w-4" />
        Clear [dev]
      </Button>
      {location.pathname.startsWith("/sets") && (
        <SetDialog
          trigger={
            <Button className="gap-2">
              <Library className="h-4 w-4" />
              New set
            </Button>
          }
          mode="create"
        />
      )}
      {location.pathname.startsWith("/folders") && (
        <FolderDialog
          trigger={
            <Button className="gap-2">
              <FolderOpen className="h-4 w-4" />
              New folder
            </Button>
          }
          mode="create"
        />
      )}
    </div>
  );
}
