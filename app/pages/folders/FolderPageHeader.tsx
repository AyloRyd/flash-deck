import { FolderOpen, Edit, Library } from "lucide-react";
import { Button } from "~/components/ui/button";
import SetDialog from "../sets/SetDialog";
import FolderDialog from "./FolderDialog";
import type { Folder } from "~/lib/types";

interface FolderPageHeaderProps {
  currentFolder: Folder;
}

export function FolderPageHeader({ currentFolder }: FolderPageHeaderProps) {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-center pb-4 mb-4 space-y-3">
      <div className="flex flex-col gap-3 items-center space-x-3 md:flex-row">
        <FolderOpen className="md:block w-8 h-8 text-primary" />
        <h1 className="text-xl text-center md:text-start font-bold">
          {currentFolder.folder_name}
        </h1>
      </div>

      <div className="flex flex-col items-center sm:flex-row space-x-3 gap-3">
        <FolderDialog
          mode="update"
          folder={currentFolder}
          trigger={
            <Button variant="outline" className="m-0 flex items-center gap-2">
              <Edit className="w-4 h-4" /> Edit folder
            </Button>
          }
        />

        <FolderDialog
          mode="create"
          parentFolderId={currentFolder.folder_id}
          trigger={
            <Button className="m-0 flex items-center gap-2">
              <FolderOpen className="w-4 h-4" /> New folder
            </Button>
          }
        />

        <SetDialog
          mode="create"
          folderId={currentFolder.folder_id}
          trigger={
            <Button className="m-0 flex items-center gap-2">
              <Library className="w-4 h-4" /> New set
            </Button>
          }
        />
      </div>
    </header>
  );
}
