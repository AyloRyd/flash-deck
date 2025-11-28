import { FolderOpen, Library } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useLocation, useNavigate } from "react-router";

export function ViewToggle() {
  const location = useLocation();
  const navigate = useNavigate();

  const view = location.pathname.startsWith("/folders") ? "folders" : "sets";

  return (
    <div className="inline-flex rounded-lg border bg-muted p-1 gap-1">
      <Button
        variant={view === "folders" ? "default" : "ghost"}
        size="sm"
        className="gap-2"
        onClick={() => navigate("/folders")}
      >
        <FolderOpen className="h-4 w-4" />
        Folders
      </Button>
      <Button
        variant={view === "sets" ? "default" : "ghost"}
        size="sm"
        className="gap-2"
        onClick={() => navigate("/sets")}
      >
        <Library className="h-4 w-4" />
        Sets
      </Button>
    </div>
  );
}
