import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  useFolderContents,
  useFolder,
  type FolderExtended,
} from "~/hooks/query-hooks";
import { SetCard } from "../sets/SetCard";
import { FolderCard } from "./FolderCard";
import { FolderPageHeader } from "./FolderPageHeader";

export default function FolderPage() {
  const { folderId } = useParams();
  const folderIdNumber = parseInt(folderId as string, 10);

  const {
    data: contents,
    isLoading: isContentLoading,
    error: contentError,
  } = useFolderContents(folderIdNumber);

  const {
    data: currentFolder,
    isLoading: isFolderLoading,
    error: folderError,
  } = useFolder(folderIdNumber);

  const isLoading = isContentLoading || isFolderLoading;
  const error = contentError || folderError;

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        Error loading folder content: {error.message}
      </div>
    );
  }

  if (isLoading || !currentFolder) {
    return <GridSkeleton />;
  }

  const { folders, sets } = contents || { folders: [], sets: [] };

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col">
        <FolderPageHeader currentFolder={currentFolder} />

        {folders.length === 0 && sets.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            This folder is empty. Use the buttons above to create a new folder
            or flashcard set.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {folders.map((folder: FolderExtended) => (
              <Link
                key={folder.folder_id}
                to={`/folders/${folder.folder_id}`}
                className="block"
              >
                <FolderCard folder={folder} />
              </Link>
            ))}

            {sets.map((set) => (
              <Link
                key={set.folder_id}
                to={`/sets/${set.folder_id}`}
                className="block"
              >
                <SetCard set={set} showFolderName={false} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const GridSkeleton = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

const CardSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader className="flex flex-row items-center gap-3 pb-3">
      <div className="rounded-lg bg-slate-200 dark:bg-slate-800 p-2 h-9 w-9" />
      <div className="flex-1 min-w-0">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
    </CardContent>
  </Card>
);
