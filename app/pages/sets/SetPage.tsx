import { useParams } from "react-router";
import { useSet, useCards, useSetMastery } from "~/hooks/query-hooks";
import { Loader2 } from "lucide-react";
import { SetPageHeader } from "./SetPageHeader";
import { CardsList } from "../cards/CardsList";
import { StudyOptions } from "./StudyOptions";

export default function SetPage() {
  const { setId } = useParams();
  const setIdNumber = parseInt(setId as string, 10);

  const {
    data: currentSet,
    isLoading: isSetLoading,
    error: setError,
  } = useSet(setIdNumber);

  const {
    data: cards,
    isLoading: isCardsLoading,
    error: cardsError,
  } = useCards(setIdNumber);

  const {
    data: masteryPercentage,
    isLoading: isMasteryLoading,
    isError: setMasteryError,
  } = useSetMastery(setIdNumber);

  if (setError) {
    return (
      <div className="text-center py-12 text-destructive">
        Error loading set content: {setError.message}
      </div>
    );
  }

  if (cardsError) {
    return (
      <div className="text-center py-12 text-destructive">
        Error loading cards: {cardsError.message}
      </div>
    );
  }

  if (isSetLoading || !currentSet) {
    return (
      <div className="w-full flex-1 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const cardsCount = cards?.length ?? 0;
  const mastery = setMasteryError
    ? "unable to define"
    : isMasteryLoading
      ? "..."
      : masteryPercentage
        ? `${Math.round(masteryPercentage)}%`
        : "0%";

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col space-y-6">
        <SetPageHeader
          currentSet={currentSet}
          cardsCount={cardsCount}
          masteryPercentage={mastery}
        />

        <StudyOptions setId={setIdNumber} cardsCount={cardsCount} />

        {isCardsLoading ? (
          <div className="w-full flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <CardsList cards={cards ?? []} setId={setIdNumber} />
        )}
      </div>
    </main>
  );
}
