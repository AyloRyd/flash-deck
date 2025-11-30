import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useCards, useStudyQueue, useProgress } from "~/hooks/query-hooks";
import { useUpdateProgress } from "~/hooks/mutation-hooks";
import { useStudyStore } from "~/stores/study-store";

export function useStudySet(mode: string) {
  const { setId } = useParams();
  const navigate = useNavigate();
  const setIdNumber = parseInt(setId as string, 10);

  const {
    currentIndex,
    isFlipped,
    isComplete,
    results,
    flip,
    submitAnswer,
    resetSession,
  } = useStudyStore();

  const { data: allCards, isLoading: isCardsLoading } = useCards(setIdNumber);
  const { data: queueCards, isLoading: isQueueLoading } =
    useStudyQueue(setIdNumber);
  const { data: progressData } = useProgress();
  const updateProgress = useUpdateProgress();

  const cards = mode === "smart" ? queueCards : allCards;
  const isLoading = mode === "smart" ? isQueueLoading : isCardsLoading;
  const currentCard = cards ? cards[currentIndex] : undefined;

  useEffect(() => {
    resetSession();
    return () => resetSession();
  }, [setIdNumber, resetSession]);

  const handleAnswer = (correct: boolean) => {
    if (!currentCard || !cards) return;

    const progressForCard = progressData?.find(
      (p) => p.card_id === currentCard.card_id
    );
    const newTotalCount = (progressForCard?.total_count || 0) + 1;
    const newCorrectCount =
      (progressForCard?.correct_count || 0) + (correct ? 1 : 0);

    updateProgress.mutate({
      cardId: currentCard.card_id,
      updates: {
        last_correct: correct,
        total_count: newTotalCount,
        correct_count: newCorrectCount,
      },
    });

    submitAnswer(currentCard.card_id, correct, cards.length);
  };

  const handleExit = () => navigate(`/sets/${setIdNumber}`);

  return {
    isLoading,
    currentCard,
    cardsLength: cards?.length || 0,
    setIdNumber,

    currentIndex,
    isFlipped,
    isComplete,
    results,
    isMutationPending: updateProgress.isPending,

    flip,
    handleAnswer,
    handleExit,
  };
}
