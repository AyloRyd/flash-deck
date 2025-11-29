import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "~/hooks/use-app-form";
import { useCreateSet, useUpdateSet } from "./mutation-hooks";
import type { SetFormProps } from "~/pages/sets/SetForm";

const setSchema = z.object({
  set_name: z.string().min(1, "Set name is required").max(100, "Name too long"),
  is_public: z.enum(["true", "false"]),
  folder_id: z.string(),
});

type SetSchema = z.infer<typeof setSchema>;

const validate = (value: SetSchema) => {
  const errors: { fields: Record<string, string> } = { fields: {} };
  const result = setSchema.safeParse(value);

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

export function useSetForm({
  mode,
  setId,
  initialData,
  folderId,
  onClose,
}: SetFormProps) {
  const { mutate: createSet, isPending: isCreating } = useCreateSet();
  const { mutate: updateSet, isPending: isUpdating } = useUpdateSet();
  const isPending = isCreating || isUpdating;

  const form = useAppForm({
    defaultValues: {
      set_name: initialData?.set_name || "",
      is_public: (initialData?.is_public ? "true" : "false") as
        | "true"
        | "false",
      folder_id: initialData?.folder_id?.toString() || folderId?.toString() || "root",
    },
    validators: {
      onBlur: ({ value }) => validate(value),
      onSubmit: async ({ value }) => {
        if (validate(value)) return;

        const payload = {
          set_name: value.set_name,
          is_public: value.is_public === "true",
          folder_id: value.folder_id === "root" ? null : parseInt(value.folder_id, 10),
        };

        if (mode === "create") {
          createSet(
            payload,
            {
              onSuccess: () => {
                toast.success("Set created");
                onClose();
              },
              onError: (error) =>
                toast.error(
                  `Failed to create set: ${error.message || "internal server error"}`
                ),
            }
          );
        } else if (mode === "update" && setId) {
          updateSet(
            {
              setId,
              updates: payload,
            },
            {
              onSuccess: () => {
                toast.success("Set updated");
                onClose();
              },
              onError: (error) =>
                toast.error(
                  `Failed to update set: ${error.message || "internal server error"}`
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
