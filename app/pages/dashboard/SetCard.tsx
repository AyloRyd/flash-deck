import { Library, Globe, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { useFolder } from "~/hooks/query-hooks";

interface SetCardProps {
  set: {
    set_id: number;
    set_name: string;
    is_public: boolean;
    folder_id: number | null;
    creation_date: string;
  };
}

export function SetCard({ set }: SetCardProps) {
  const { data, error, isLoading } = useFolder(set.folder_id);

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
        <div className="text-xs text-muted-foreground">
          {error
            ? set.folder_id
              ? "In folder"
              : "No folder"
            : isLoading
              ? "Loading folder..."
              : data
                ? data.folder_name
                : "No folder"}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Created: {new Date(set.creation_date).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}