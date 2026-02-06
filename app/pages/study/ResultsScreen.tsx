import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ResultsScreenProps {
  correctCount: number;
  totalCount: number;
  onBack: () => void;
}

export function ResultsScreen({
  correctCount,
  totalCount,
  onBack,
}: ResultsScreenProps) {
  const percentage =
    totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Study Complete!</h1>
        <div className="text-6xl font-bold text-primary">{percentage}%</div>
        <p className="text-xl text-muted-foreground">
          {correctCount} out of {totalCount} correct
        </p>
      </div>
      <Button size="lg" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to set
      </Button>
    </div>
  );
}
