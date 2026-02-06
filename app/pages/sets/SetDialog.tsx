import { Library, Edit, Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import type { Set } from "~/lib/types";
import SetForm from "./SetForm";

type SetDialogProps =
  | {
      mode: "create";
      set?: never;
      trigger: React.ReactNode;
      folderId?: number;
    }
  | {
      mode: "update";
      set: Set;
      trigger: React.ReactNode;
      folderId?: never;
    };

export default function SetDialog({
  mode,
  set: setData,
  trigger,
  folderId,
}: SetDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-xl border shadow-lg max-w-lg backdrop-blur-sm bg-white/95 dark:bg-background"
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
                {mode === "create" ? "Create new set" : "Edit set"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {mode === "create"
                  ? "Add a new collection of flashcards to your library."
                  : "Update the details of this set."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <SetForm
          mode={mode}
          setId={setData?.set_id}
          initialData={mode === "update" ? setData : undefined}
          folderId={folderId}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}