import { useSets } from "~/hooks/query-hooks";
import { SetCard } from "./SetCard";
import { Card, CardHeader, CardContent } from "~/components/ui/card";

export default function SetsGrid() {
  const { data: sets, isLoading, error } = useSets();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SetCardSkeleton key={i} />
        ))}
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
        No sets yet. Create new set to get started!
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

const SetCardSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader className="flex flex-row items-center gap-3 pb-3">
      <div className="rounded-lg bg-slate-200 dark:bg-slate-800 p-2 h-9 w-9" />
      <div className="flex-1 min-w-0">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
    </CardHeader>
    <CardContent>
      <div className="mb-4">
        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </CardContent>
  </Card>
);
