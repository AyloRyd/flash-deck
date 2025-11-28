import { Trash2, BookOpen, Languages } from "lucide-react";
import { Button } from "~/components/ui/button";
import { usePopulateGermanCourse, usePopulateEnglishVerbs, useClearUserData } from "~/hooks/mutation-hooks";

export function DatabaseActions() {
  const populateGerman = usePopulateGermanCourse();
  const populateEnglish = usePopulateEnglishVerbs();
  const clearData = useClearUserData();

  const isLoading =
    populateGerman.isPending ||
    populateEnglish.isPending ||
    clearData.isPending;

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => populateGerman.mutate()}
        disabled={isLoading}
      >
        <Languages className="h-4 w-4" />
        Add German Course
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => populateEnglish.mutate()}
        disabled={isLoading}
      >
        <BookOpen className="h-4 w-4" />
        Add English Verbs
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-destructive hover:bg-destructive/10"
        onClick={() => {
          if (
            confirm(
              "Are you sure? This will delete all your folders, sets, cards, and progress."
            )
          ) {
            clearData.mutate();
          }
        }}
        disabled={isLoading}
      >
        <Trash2 className="h-4 w-4" />
        Clear All Data
      </Button>
    </div>
  );
}