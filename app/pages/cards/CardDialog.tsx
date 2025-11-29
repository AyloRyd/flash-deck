import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import type { Card } from "~/lib/types";
import CardForm from "./CardForm";


type CardDialogProps =
  | {
      mode: "create";
      card?: never;
      trigger: React.ReactNode;
      setId: number;
    }
  | {
      mode: "update";
      card: Card;
      trigger: React.ReactNode;
      setId?: never;
    };

export default function CardDialog({
  mode,
  card: cardData,
  trigger,
  setId,
}: CardDialogProps) {
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
                {mode === "create" ? "Add new card" : "Edit card"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {mode === "create"
                  ? "Add a new question and answer pair to this set."
                  : "Update the content of this flashcard."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <CardForm
          mode={mode}
          cardId={cardData?.card_id}
          initialData={mode === "update" ? cardData : undefined}
          setId={setId}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}