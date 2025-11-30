import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "~/hooks/use-app-form";
import { useCreateFolder, useUpdateFolder } from "./mutation-hooks";
import type { FolderFormProps } from "~/pages/folders/FolderForm";

const folderSchema = z.object({
  folder_name: z
    .string()
    .min(1, "Folder name is required")
    .max(100, "Name too long"),
});

type FolderSchema = z.infer<typeof folderSchema>;

const validate = (value: FolderSchema) => {
  const errors: { fields: Record<string, string> } = { fields: {} };
  const result = folderSchema.safeParse(value);
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

export function useFolderForm({
  mode,
  folderId,
  initialData,
  parentFolderId,
  onClose,
}: FolderFormProps) {
  const { mutate: createFolder, isPending: isCreating } = useCreateFolder();
  const { mutate: updateFolder, isPending: isUpdating } = useUpdateFolder();
  const isPending = isCreating || isUpdating;

  const form = useAppForm({
    defaultValues: {
      folder_name: initialData?.folder_name || "",
    },
    validators: {
      onBlur: ({ value }) => validate(value),
      onSubmit: async ({ value }) => {
        if (validate(value)) return;

        const payload = {
          folder_name: value.folder_name,
        };

        if (mode === "create") {
          createFolder(
            {
              ...payload,
              parent_folder_id: parentFolderId ?? null,
            },
            {
              onSuccess: () => {
                toast.success("Folder created");
                onClose();
              },
              onError: (error) =>
                toast.error(
                  `Failed to create folder. ${error.message || "Internal server error."}`
                ),
            }
          );
        } else if (mode === "update" && folderId) {
          updateFolder(
            {
              folderId,
              updates: payload,
            },
            {
              onSuccess: () => {
                toast.success("Folder updated");
                onClose();
              },
              onError: (error) =>
                toast.error(
                  `Failed to update folder. ${error.message || "Internal server error."}`
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
