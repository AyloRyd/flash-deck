import { Button } from "~/components/ui/button";
import { useFolderForm } from "~/hooks/use-folder-form";
import type { Folder } from "~/lib/types";
import { AppFormField } from "~/components/form-components/AppFormField";

export interface FolderFormProps {
  mode: "create" | "update";
  folderId?: number;
  initialData?: Folder;
  parentFolderId?: number;
  onClose: () => void;
}

export default function FolderForm({
  mode,
  folderId,
  initialData,
  parentFolderId,
  onClose,
}: FolderFormProps) {
  const { form, isPending } = useFolderForm({
    mode,
    folderId,
    initialData,
    parentFolderId,
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
        name="folder_name"
        label="Folder name"
        placeholder="e.g. English"
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
            ? "Create Folder"
            : "Save changes"}
        </Button>
      </div>
    </form>
  );
}