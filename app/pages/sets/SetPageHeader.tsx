import { Edit, BookOpen, TrendingUp, Library } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Set } from "~/lib/types";
import SetDialog from "./SetDialog";

interface SetPageHeaderProps {
  currentSet: Set;
  cardsCount: number;
  masteryPercentage: number | null;
}

export function SetPageHeader({
  currentSet,
  cardsCount,
  masteryPercentage,
}: SetPageHeaderProps) {
  return (
    <header className="space-y-6">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col md:flex-row items-center space-x-3 space-y-3">
          <Library className="w-10 h-10 text-primary" />
          <h1 className="text-2xl font-bold text-center">{currentSet.set_name}</h1>
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
            Mastery:{" "}
            {masteryPercentage !== null
              ? `${Math.round(masteryPercentage)}%`
              : "..."}
          </span>
        </div>
      </div>
    </header>
  );
}
