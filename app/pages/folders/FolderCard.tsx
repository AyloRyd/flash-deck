import { Folder, FolderOpen, Library } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { FolderCardOptions } from "./FolderCardOptions";
import type { FolderExtended } from "~/hooks/query-hooks";

interface FolderCardProps {
  folder: FolderExtended;
}

const CountDisplay = ({ folder }: { folder: FolderExtended }) => (
  <span className="flex items-center gap-1">
    <Folder className="h-3 w-3" />
    {folder.subfolders_count || 0}{" "}
    {folder.subfolders_count === 1 ? "folder" : "folders"}
    <span>•</span>
    <Library className="h-3 w-3" />
    {folder.sets_count || 0} {folder.sets_count === 1 ? "set" : "sets"}
  </span>
);

export function FolderCard({ folder }: FolderCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
          <FolderOpen className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 overflow-hidden">
          <CardTitle className="text-base truncate" title={folder.folder_name}>
            {folder.folder_name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground md:hidden">
            <CountDisplay folder={folder} />
          </span>
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="hidden md:flex">
                <CountDisplay folder={folder} />
              </span>
              <span className="hidden md:block">•</span>
              <span>{new Date(folder.updated_at).toLocaleDateString()}</span>
            </div>
            <FolderCardOptions folder={folder} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
