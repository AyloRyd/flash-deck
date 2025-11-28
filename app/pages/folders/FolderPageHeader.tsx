import { FolderOpen, Edit, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import SetDialog from "../sets/SetDialog";
import FolderDialog from "./FolderDialog";
import type { Folder } from "~/lib/types";

interface FolderPageHeaderProps {
  currentFolder: Folder;
}

export function FolderPageHeader({ currentFolder }: FolderPageHeaderProps) {
  return (
    <header className="flex justify-between items-center pb-4 mb-4">
      <div className="flex items-center space-x-3">
        <FolderOpen className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold">{currentFolder.folder_name}</h1>
      </div>

      <div className="flex space-x-3">
        <FolderDialog
          mode="update"
          folder={currentFolder}
          trigger={
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="w-4 h-4" /> Edit folder
            </Button>
          }
        />

        <FolderDialog
          mode="create"
          parentFolderId={currentFolder.folder_id}
          trigger={
            <Button variant="secondary" className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> New folder
            </Button>
          }
        />

        <SetDialog
          mode="create"
          folderId={currentFolder.folder_id}
          trigger={
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> New set
            </Button>
          }
        />
      </div>
    </header>
  );
}
