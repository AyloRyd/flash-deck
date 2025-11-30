import { create } from "zustand";

interface Result {
  cardId: number;
  correct: boolean;
}

interface StudyState {
  currentIndex: number;
  isFlipped: boolean;
  isComplete: boolean;
  results: Result[];

  flip: () => void;
  setFlipped: (isFlipped: boolean) => void;
  submitAnswer: (cardId: number, correct: boolean, totalCards: number) => void;
  resetSession: () => void;
}

export const useStudyStore = create<StudyState>((set) => ({
  currentIndex: 0,
  isFlipped: false,
  isComplete: false,
  results: [],

  flip: () => set((state) => ({ isFlipped: !state.isFlipped })),

  setFlipped: (isFlipped) => set({ isFlipped }),

  submitAnswer: (cardId, correct, totalCards) =>
    set((state) => {
      const nextIndex = state.currentIndex + 1;
      const isFinished = nextIndex >= totalCards;

      return {
        results: [...state.results, { cardId, correct }],
        isFlipped: false,
        currentIndex: isFinished ? state.currentIndex : nextIndex,
        isComplete: isFinished,
      };
    }),

  resetSession: () =>
    set({
      currentIndex: 0,
      isFlipped: false,
      isComplete: false,
      results: [],
    }),
}));
