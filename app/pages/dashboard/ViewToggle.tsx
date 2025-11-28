import { FolderOpen, Library } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { View } from ".";

interface ViewToggleProps {
  view: View;
  onViewChange: (view: View) => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg border bg-muted p-1 gap-1">
      <Button
        variant={view === "folders" ? "default" : "ghost"}
        size="sm"
        className="gap-2"
        onClick={() => onViewChange("folders")}
      >
        <FolderOpen className="h-4 w-4" />
        Folders
      </Button>
      <Button
        variant={view === "sets" ? "default" : "ghost"}
        size="sm"
        className="gap-2"
        onClick={() => onViewChange("sets")}
      >
        <Library className="h-4 w-4" />
        Sets
      </Button>
    </div>
  );
}