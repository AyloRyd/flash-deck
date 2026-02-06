import { Edit, BookOpen, TrendingUp, Library } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FolderBreadcrumbs } from "~/pages/folders/FolderBreadcrumbs";
import { useFolderPath } from "~/hooks/query-hooks";
import type { Set } from "~/lib/types";
import SetDialog from "./SetDialog";

interface SetPageHeaderProps {
  currentSet: Set;
  cardsCount: number;
  masteryPercentage: string;
}

export function SetPageHeader({
  currentSet,
  cardsCount,
  masteryPercentage,
}: SetPageHeaderProps) {
  const { data: folderPath = [] } = useFolderPath(currentSet.folder_id ?? null);

  return (
    <header className="space-y-6">
      <div className="flex flex-col justify-center items-center gap-6 px-4">
        <FolderBreadcrumbs
          path={folderPath}
          setLabel={currentSet.set_name}
          setId={currentSet.set_id}
        />
        <div className="flex items-center gap-3 min-w-0 max-w-full">
          <Library className="w-6 h-6 md:w-10 md:h-10 text-primary shrink-0" />
          <h1 className="text-md md:text-xl font-bold text-center truncate">
            {currentSet.set_name}
          </h1>
        </div>
        <SetDialog
          mode="update"
          set={currentSet}
          trigger={
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="w-4 h-4" /> Edit set
            </Button>
          }
        />
      </div>

      <div className="flex items-center justify-center gap-6 text-lg text-muted-foreground">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>
            {cardsCount} {cardsCount === 1 ? "card" : "cards"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span>
            Mastery: {masteryPercentage}
          </span>
        </div>
      </div>
    </header>
  );
}
