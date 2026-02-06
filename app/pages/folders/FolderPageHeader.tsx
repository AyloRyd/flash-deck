import { FolderOpen, Edit, Library } from "lucide-react";
import { Button } from "~/components/ui/button";
import SetDialog from "../sets/SetDialog";
import FolderDialog from "./FolderDialog";
import { FolderBreadcrumbs } from "~/pages/folders/FolderBreadcrumbs";
import { useFolderPath } from "~/hooks/query-hooks";
import type { Folder } from "~/lib/types";

interface FolderPageHeaderProps {
  currentFolder: Folder;
}

export function FolderPageHeader({ currentFolder }: FolderPageHeaderProps) {
  const { data: path = [] } = useFolderPath(currentFolder.folder_id);

  return (
    <header className="flex flex-col lg:flex-row justify-between items-center pb-4 mb-4 gap-3">
      <div className="flex flex-col gap-2 min-w-0 w-full lg:w-auto">
        <FolderBreadcrumbs path={path} currentIsPage />
        <div className="flex gap-3 items-center min-w-0">
        <FolderOpen className="w-6 h-6 md:w-8 md:h-8 text-primary shrink-0" />
        <h1 className="text-md md:text-xl text-center md:text-start font-bold truncate max-w-full">
          {currentFolder.folder_name}
        </h1>
        </div>
      </div>

      <div className="flex flex-col items-center sm:flex-row space-x-0 sm:space-x-3 gap-2 shrink-0">
        <FolderDialog
          mode="update"
          folder={currentFolder}
          trigger={
            <Button variant="outline" className="m-0 flex items-center gap-2">
              <Edit className="w-4 h-4" /> Edit folder
            </Button>
          }
        />

        <div className="flex gap-2 justify-between">
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
      </div>
    </header>
  );
}
