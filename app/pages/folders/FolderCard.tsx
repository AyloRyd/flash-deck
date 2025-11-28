import { FolderOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { FolderCardOptions } from "./FolderCardOptions";
import type { Folder } from "~/lib/types";

interface FolderCardProps {
  folder: Folder;
}

export function FolderCard({ folder }: FolderCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <FolderOpen className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-base">{folder.folder_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full justify-between items-center">
          <div className="mt-1 text-xs text-muted-foreground">
            Updated: {new Date(folder.updated_at).toLocaleDateString()}
          </div>
          <FolderCardOptions folder={folder} />
        </div>
      </CardContent>
    </Card>
  );
}
