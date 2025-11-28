import { useState } from "react";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import SetDialog from "./SetDialog";
import type { Set } from "~/lib/types";
import { toast } from "sonner";
import { useDeleteSet } from "~/hooks/mutation-hooks";

export function SetCardOptions({ set }: { set: Set }) {
  const { mutate: deleteSet } = useDeleteSet();
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
          className="p-2 hover:bg-slate-100 rounded-md transition-colors"
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
        className="w-48 p-1 bg-white border shadow-lg rounded-lg"
      >
        <SetDialog
          mode="update"
          set={set}
          trigger={
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 flex items-center gap-2 rounded-md transition-colors">
              <Edit className="w-4 h-4 text-primary" /> Edit
            </button>
          }
        />
        <div className="h-px bg-border my-1"></div>
        <button
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to delete this set? This will also delete all cards in this set. This action cannot be undone."
              )
            ) {
              deleteSet(set.set_id);
              toast.success("Set deleted");
              setOpen(false);
            }
          }}
          className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2 rounded-md transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}