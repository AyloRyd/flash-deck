export const queryKeys = {
  folders: ["folders"] as const,
  folder: (id: number) => ["folders", id] as const, 
  folderContents: (id: number) => ["folder-contents", id] as const,
  sets: (folderId?: number) =>
    folderId ? ["sets", folderId] : (["sets"] as const),
  set: (setId: number) => ["sets", setId] as const,
  cards: (setId: number) => ["cards", setId] as const,
  progress: (userId?: string) =>
    userId ? ["progress", userId] : (["progress"] as const),
  publicSets: ["public-sets"] as const,
  studyQueue: (setId: number) => ["study-queue", setId] as const,
  setMastery: (setId: number) => ["set-mastery", setId] as const,
  cardStatus: (cardId: number) => ["card-status", cardId] as const,
};