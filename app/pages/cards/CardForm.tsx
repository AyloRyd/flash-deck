import { Button } from "~/components/ui/button";
import { useCardForm } from "~/hooks/use-card-form";
import type { Card } from "~/lib/types";
import { AppFormField } from "~/components/form-components/AppFormField";

export interface CardFormProps {
  mode: "create" | "update";
  cardId?: number;
  initialData?: Card;
  setId?: number;
  onClose: () => void;
}

export default function CardForm({
  mode,
  cardId,
  initialData,
  setId,
  onClose,
}: CardFormProps) {
  const { form, isPending } = useCardForm({
    mode,
    cardId,
    initialData,
    setId,
    onClose,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 mt-2"
    >
      <AppFormField
        form={form}
        name="front_text"
        label="Front (term)"
        placeholder="e.g. What is the capital of France?"
        isTextarea
        className="min-h-20"
      />

      <AppFormField
        form={form}
        name="back_text"
        label="Back (definition)"
        placeholder="e.g. Paris"
        isTextarea
        className="min-h-20"
      />

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          disabled={isPending}
          onClick={() => form.handleSubmit()}
          className="font-bold"
        >
          {isPending
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
            ? "Add Card"
            : "Save changes"}
        </Button>
      </div>
    </form>
  );
}