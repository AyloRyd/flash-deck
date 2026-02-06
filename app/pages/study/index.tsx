import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ActionButtons } from "./ActionButtons";
import { FlipCard } from "./FlipCard";
import { ResultsScreen } from "./ResultsScreen";
import { useStudySet } from "~/hooks/use-study-set";

interface StudyProps {
  mode: string;
}

export function Study({ mode }: StudyProps) {
  const {
    isLoading,
    currentCard,
    cardsLength,
    currentIndex,
    isFlipped,
    isComplete,
    results,
    isMutationPending,
    flip,
    handleAnswer,
    handleExit,
  } = useStudySet(mode);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <p className="text-muted-foreground">No cards to study</p>
        <Button onClick={handleExit}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to set
        </Button>
      </div>
    );
  }

  if (isComplete) {
    const correctCount = results.filter((r) => r.correct).length;
    return (
      <ResultsScreen
        correctCount={correctCount}
        totalCount={results.length}
        onBack={handleExit}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <div className="flex justify-center mb-6">
        <Button variant="ghost" onClick={handleExit}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to set
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 mx-auto w-full">
        <div className="text-sm text-muted-foreground font-medium">
          {currentIndex + 1} / {cardsLength}
        </div>

        <FlipCard
          key={currentCard.card_id}
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={flip}
        />

        <p className="text-sm text-muted-foreground">Click card to flip</p>

        <ActionButtons
          onKnow={() => handleAnswer(true)}
          onDontKnow={() => handleAnswer(false)}
          disabled={isMutationPending}
        />
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
