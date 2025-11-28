import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postgrest } from "~/lib/postgrest";
import { queryKeys } from "./keys";
import type { Folder, Set, Card, Progress } from "~/lib/types";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      folder: Omit<Folder, "folder_id" | "updated_at" | "user_id">
    ) => {
      const { data, error } = await postgrest
        .from("folders")
        .insert(folder)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Folder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders });
    },
  });
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      folderId,
      updates,
    }: {
      folderId: number;
      updates: Partial<Omit<Folder, "folder_id" | "user_id">>;
    }) => {
      const { data, error } = await postgrest
        .from("folders")
        .update(updates)
        .eq("folder_id", folderId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Folder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders });
    },
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (folderId: number) => {
      const { error } = await postgrest
        .from("folders")
        .delete()
        .eq("folder_id", folderId);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders });
      queryClient.invalidateQueries({ queryKey: ["sets"] });
    },
  });
};

export const useCreateSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      set: Omit<Set, "set_id" | "creation_date" | "updated_at" | "user_id">
    ) => {
      const { data, error } = await postgrest
        .from("sets")
        .insert(set)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Set;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sets"] });
      if (data.is_public) {
        queryClient.invalidateQueries({ queryKey: queryKeys.publicSets });
      }
    },
  });
};

export const useUpdateSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      setId,
      updates,
    }: {
      setId: number;
      updates: Partial<Omit<Set, "set_id" | "user_id" | "creation_date">>;
    }) => {
      const { data, error } = await postgrest
        .from("sets")
        .update(updates)
        .eq("set_id", setId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Set;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sets"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.set(data.set_id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.publicSets });
    },
  });
};

export const useDeleteSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (setId: number) => {
      const { error } = await postgrest
        .from("sets")
        .delete()
        .eq("set_id", setId);

      if (error) throw new Error(error.message);
    },
    onSuccess: (_, setId) => {
      queryClient.invalidateQueries({ queryKey: ["sets"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.set(setId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cards(setId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.publicSets });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (card: Omit<Card, "card_id" | "updated_at">) => {
      const { data, error } = await postgrest
        .from("cards")
        .insert(card)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Card;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards(data.set_id) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.studyQueue(data.set_id),
      });
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cardId,
      updates,
    }: {
      cardId: number;
      updates: Partial<Omit<Card, "card_id" | "set_id">>;
    }) => {
      const { data, error } = await postgrest
        .from("cards")
        .update(updates)
        .eq("card_id", cardId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Card;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards(data.set_id) });
    },
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cardId,
      setId,
    }: {
      cardId: number;
      setId: number;
    }) => {
      const { error } = await postgrest
        .from("cards")
        .delete()
        .eq("card_id", cardId);

      if (error) throw new Error(error.message);
      return { setId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards(data.setId) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.studyQueue(data.setId),
      });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cardId,
      updates,
    }: {
      cardId: number;
      updates: Partial<Omit<Progress, "user_id" | "card_id">>;
    }) => {
      const { data, error } = await postgrest
        .from("progress")
        .upsert({ card_id: cardId, ...updates })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Progress;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["study-queue"] });
      queryClient.invalidateQueries({ queryKey: ["set-mastery"] });
      queryClient.invalidateQueries({ queryKey: ["card-status"] });
    },
  });
};

export const useClonePublicSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sourceSetId: number) => {
      const { data, error } = await postgrest.rpc("clone_public_set", {
        p_source_set_id: sourceSetId,
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sets"] });
    },
  });
};

export const usePopulateGermanCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await postgrest.rpc("populate_german_course");

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders });
      queryClient.invalidateQueries({ queryKey: ["sets"] });
    },
  });
};

export const usePopulateEnglishVerbs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await postgrest.rpc("populate_english_verbs");

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sets"] });
    },
  });
};

export const useClearUserData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await postgrest.rpc("clear_user_data");

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders });
      queryClient.invalidateQueries({ queryKey: ["sets"] });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
};
