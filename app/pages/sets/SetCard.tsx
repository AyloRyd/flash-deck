import { Library, Globe, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { useCards, useFolder } from "~/hooks/query-hooks";
import { SetCardOptions } from "../sets/SetCardOptions";
import type { Set } from "~/lib/types";
import { cn } from "~/lib/utils";

interface SetCardProps {
  set: Set;
  showFolderName?: boolean;
}

export function SetCard({ set, showFolderName }: SetCardProps) {
  const {
    data: folder,
    error: folderError,
    isLoading: folderIsLoading,
  } = useFolder(set.folder_id);

  const {
    data: cards,
    error: cardsError,
    isLoading: cardsIsLoading,
  } = useCards(set.set_id);

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Library className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-base truncate">{set.set_name}</CardTitle>
        </div>
        {set.is_public ? (
          <Badge variant="secondary" className="gap-1">
            <Globe className="h-3 w-3" />
            Public
          </Badge>
        ) : (
          <Badge variant="outline" className="gap-1">
            <Lock className="h-3 w-3" />
            Private
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn(showFolderName ? "mb-4" : "mb-0")}>
          {cardsIsLoading ? (
            "Loading cards..."
          ) : cardsError ? (
            "Error loading cards"
          ) : (
            <div className="text-xs text-muted-foreground">
              {cards?.length ?? 0} term{(cards?.length ?? 0) !== 1 ? "s" : ""}
            </div>
          )}
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <div className="text-xs text-muted-foreground">
              {showFolderName
                ? folderError
                  ? set.folder_id
                    ? "In folder"
                    : "No folder"
                  : folderIsLoading
                    ? "Loading folder..."
                    : folder
                      ? folder.folder_name
                      : "No folder"
                : null}
            </div>
            <div className="text-xs text-muted-foreground">
              Created: {new Date(set.creation_date).toLocaleDateString()}
            </div>
          </div>

          <SetCardOptions set={set} />
        </div>
      </CardContent>
    </Card>
  );
}
