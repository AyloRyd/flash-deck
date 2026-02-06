import { useState } from "react";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import FolderDialog from "./FolderDialog";
import type { Folder } from "~/lib/types";
import { toast } from "sonner";
import { useDeleteFolder } from "~/hooks/mutation-hooks";

export function FolderCardOptions({ folder }: { folder: Folder }) {
  const { mutate: deleteFolder } = useDeleteFolder();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className="cursor-pointer p-2 hover:bg-secondary rounded-md transition-colors"
          aria-label="More options"
        >
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        align="end"
        className="w-48 p-1 bg-background border shadow-lg rounded-lg"
      >
        <FolderDialog
          mode="update"
          folder={folder}
          trigger={
            <button className="cursor-pointer w-full text-left px-3 py-2 text-sm hover:bg-secondary flex items-center gap-2 rounded-md transition-colors">
              <Edit className="w-4 h-4 text-primary" /> Edit
            </button>
          }
        />
        <div className="h-px bg-border my-1"></div>
        <button
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to delete this folder? This will also delete all sets and subfolders inside it. This action cannot be undone."
              )
            ) {
              deleteFolder(folder.folder_id);
              toast.success("Folder deleted");
              setOpen(false);
            }
          }}
          className="cursor-pointer w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2 rounded-md transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}
