import { Loader2 } from "lucide-react";
import { useFolders } from "~/hooks/query-hooks";
import { FolderCard } from "./FolderCard";

export function FoldersGrid() {
  const { data: folders, isLoading, error } = useFolders(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        Error loading folders: {error.message}
      </div>
    );
  }

  if (!folders || folders.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No folders yet. Add some demo data to get started!
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {folders.map((folder) => (
        <FolderCard key={folder.folder_id} folder={folder} />
      ))}
    </div>
  );
}