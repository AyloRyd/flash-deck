import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "~/hooks/use-app-form";
import { useCreateCard, useUpdateCard } from "./mutation-hooks"; 
import type { CardFormProps } from "~/pages/cards/CardForm";

const cardSchema = z.object({
  front_text: z.string().min(1, "Front side is required").max(1000, "Text too long"),
  back_text: z.string().min(1, "Back side is required").max(1000, "Text too long"),
});

type CardSchema = z.infer<typeof cardSchema>;

const validate = (value: CardSchema) => {
  const errors: { fields: Record<string, string> } = { fields: {} };
  const result = cardSchema.safeParse(value);

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!errors.fields[field]) {
        errors.fields[field] = issue.message;
      }
    }
    return errors;
  }
};

export function useCardForm({
  mode,
  cardId,
  initialData,
  setId,
  onClose,
}: CardFormProps) {
  const { mutate: createCard, isPending: isCreating } = useCreateCard();
  const { mutate: updateCard, isPending: isUpdating } = useUpdateCard();
  const isPending = isCreating || isUpdating;

  const form = useAppForm({
    defaultValues: {
      front_text: initialData?.front_text || "",
      back_text: initialData?.back_text || "",
    },
    validators: {
      onBlur: ({ value }) => validate(value),
      onSubmit: async ({ value }) => {
        if (validate(value)) return;

        const payload = {
          front_text: value.front_text,
          back_text: value.back_text,
        };

        if (mode === "create") {
          if (!setId) {
            toast.error("Set ID is missing");
            return;
          }

          createCard(
            {
              ...payload,
              set_id: setId,
            },
            {
              onSuccess: () => {
                toast.success("Card created");
                onClose();
              },
              onError: (error) =>
                toast.error(
                  `Failed to create card. ${error.message || "Internal server error."}`
                ),
            }
          );
        } else if (mode === "update" && cardId) {
          updateCard(
            {
              cardId,
              updates: payload,
            },
            {
              onSuccess: () => {
                toast.success("Card updated");
                onClose();
              },
              onError: (error) =>
                toast.error(
                  `Failed to update card. ${error.message || "Internal server error."}`
                ),
            }
          );
        }

        return null;
      },
    },
  });

  return { form, isPending };
}