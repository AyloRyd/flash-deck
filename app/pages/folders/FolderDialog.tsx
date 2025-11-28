import { Folder, Edit, Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import type { Folder as FolderType } from "~/lib/types";
import FolderForm from "./FolderForm";

type FolderDialogProps =
  | {
      mode: "create";
      folder?: never;
      trigger: React.ReactNode;
      parentFolderId?: number;
    }
  | {
      mode: "update";
      folder: FolderType;
      trigger: React.ReactNode;
      parentFolderId?: never;
    };

export default function FolderDialog({
  mode,
  folder: folderData,
  trigger,
  parentFolderId,
}: FolderDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-xl border shadow-lg max-w-lg backdrop-blur-sm bg-white/95"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              {mode === "create" ? (
                <Plus className="h-5 w-5 text-primary" />
              ) : (
                <Edit className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {mode === "create" ? "Create new folder" : "Edit folder"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {mode === "create"
                  ? "Organize your flashcard sets with a new folder."
                  : "Update the details of this folder."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <FolderForm
          mode={mode}
          folderId={folderData?.folder_id}
          initialData={mode === "update" ? folderData : undefined}
          parentFolderId={parentFolderId}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}