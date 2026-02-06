import { useFolders } from "~/hooks/query-hooks";
import { FolderCard } from "./FolderCard";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { FolderBreadcrumbs } from "~/pages/folders/FolderBreadcrumbs";
import { Link } from "react-router";

export default function FoldersGrid() {
  const { data: folders, isLoading, error } = useFolders(true);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <FolderBreadcrumbs path={[]} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <FolderCardSkeleton key={i} />
        ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <FolderBreadcrumbs path={[]} />
        <div className="text-center py-12 text-destructive">
          Error loading folders: {error.message}
        </div>
      </div>
    );
  }

  if (!folders || folders.length === 0) {
    return (
      <div className="space-y-4">
        <FolderBreadcrumbs path={[]} />
        <div className="text-center py-12 text-muted-foreground">
          No folders yet. Create new folder to get started!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FolderBreadcrumbs path={[]} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {folders.map((folder) => (
        <Link to={`/folders/${folder.folder_id}`} key={folder.folder_id}>
          <FolderCard folder={folder} />
        </Link>
      ))}
      </div>
    </div>
  );
}

const FolderCardSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader className="flex flex-row items-center gap-3 pb-3">
      <div className="rounded-lg bg-slate-200 dark:bg-slate-800 p-2 h-9 w-9" />
      <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
    </CardHeader>
    <CardContent>
      <div className="flex w-full justify-between items-center">
        <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </CardContent>
  </Card>
);
