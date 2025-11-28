import { Loader2 } from "lucide-react";
import { useSets } from "~/hooks/query-hooks";
import { SetCard } from "./SetCard";

export function SetsGrid() {
  const { data: sets, isLoading, error } = useSets();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        Error loading sets: {error.message}
      </div>
    );
  }

  if (!sets || sets.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No sets yet. Add some demo data to get started!
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sets.map((set) => (
        <SetCard key={set.set_id} set={set} />
      ))}
    </div>
  );
}
