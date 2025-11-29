import { Button } from "~/components/ui/button";
import { useSetForm } from "~/hooks/use-set-form";
import { useFolders } from "~/hooks/query-hooks";
import type { Set } from "~/lib/types";
import { AppFormField } from "~/components/form-components/AppFormField";
import { Select } from "~/components/form-components/Select";

export interface SetFormProps {
  mode: "create" | "update";
  setId?: number;
  initialData?: Set;
  folderId?: number;
  onClose: () => void;
}

export default function SetForm({
  mode,
  setId,
  initialData,
  folderId,
  onClose,
}: SetFormProps) {
  const { form, isPending } = useSetForm({
    mode,
    setId,
    initialData,
    folderId,
    onClose,
  });

  const { data: folders, isLoading: isFoldersLoading } = useFolders();

  const folderOptions = [
    { value: "root", label: "No folder" },
    ...(folders || []).map((folder) => ({
      value: folder.folder_id.toString(),
      label: folder.folder_name,
    })),
  ];

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
        name="set_name"
        label="Set name"
        placeholder="e.g. French Vocabulary"
      />

      <form.AppField name="folder_id">
        {() => (
          <Select
            label="Parent folder"
            values={folderOptions}
            placeholder={
              isFoldersLoading ? "Loading folders..." : "Select folder"
            }
          />
        )}
      </form.AppField>

      <form.AppField name="is_public">
        {() => (
          <Select
            label="Visibility"
            values={[
              { label: "Private", value: "false" },
              { label: "Public", value: "true" },
            ]}
            placeholder="Select visibility"
          />
        )}
      </form.AppField>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="ghost" onClick={onClose}>
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
              ? "Create Set"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
