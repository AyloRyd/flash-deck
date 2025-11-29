import { Button } from "~/components/ui/button";
import { BookOpen, Brain } from "lucide-react";

interface StudyOptionsProps {
  setId: number;
  cardsCount: number;
}

export function StudyOptions({ setId, cardsCount }: StudyOptionsProps) {
  if (cardsCount === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 px-0 sm:px-0 md:px-10 lg:px-20 xl:px-40">
      <Button 
        size="lg" 
        className="h-20 text-lg rounded-2xl"
        onClick={() => {
          // TODO: Navigate to study mode with all cards
          console.log('Study all cards:', setId);
        }}
      >
        <BookOpen className="w-5 h-5 mr-2" />
        Study set (default queue)
      </Button>

      <Button 
        size="lg" 
        variant="secondary"
        className="h-20 text-lg rounded-2xl"
        onClick={() => {
          // TODO: Navigate to study mode with study queue
          console.log('Study queue:', setId);
        }}
      >
        <Brain className="w-5 h-5 mr-2" />
        Study set (smart queue)
      </Button>
    </div>
  );
}