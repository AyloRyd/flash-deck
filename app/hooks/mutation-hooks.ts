import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postgrest, pgRErr, type PgRError } from "~/lib/postgrest";
import { queryKeys } from "./keys";
import type { Folder, Set, Card, Progress } from "~/lib/types";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Folder,
    PgRError,
    Omit<Folder, "folder_id" | "updated_at" | "user_id">
  >({
    mutationFn: async (folder) => {
      const { data, error } = await postgrest
        .from("folders")
        .insert(folder)
        .select()
        .single();

      if (error) throw pgRErr(error);
      return data as Folder;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders });

      if (data.parent_folder_id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.folderContents(data.parent_folder_id),
        });
      }
    },
  });
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Folder,
    PgRError,
    {
      folderId: number;
      updates: Partial<Omit<Folder, "folder_id" | "user_id">>;
    }
  >({
    mutationFn: async ({ folderId, updates }) => {
      const { data, error } = await postgrest
        .from("folders")
        .update(updates)
        .eq("folder_id", folderId)
        .select()
        .single();

      if (error) throw pgRErr(error);
      return data as Folder;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders });
      queryClient.invalidateQueries({
        queryKey: queryKeys.folder(data.folder_id),
      });

      if (data.parent_folder_id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.folderContents(data.parent_folder_id),
        });
      }
    },
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation<void, PgRError, number>({
    mutationFn: async (folderId) => {
      const { error } = await postgrest
        .from("folders")
        .delete()
        .eq("folder_id", folderId);

      if (error) throw pgRErr(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders });
      queryClient.invalidateQueries({ queryKey: ["folder-contents"] });
    },
  });
};

export const useCreateSet = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Set,
    PgRError,
    Omit<Set, "set_id" | "creation_date" | "updated_at" | "user_id">
  >({
    mutationFn: async (set) => {
      const { data, error } = await postgrest
        .from("sets")
        .insert(set)
        .select()
        .single();

      if (error) throw pgRErr(error);
      return data as Set;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sets"] });

      if (data.folder_id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.folderContents(data.folder_id),
        });
      }

      if (data.is_public) {
        queryClient.invalidateQueries({ queryKey: queryKeys.publicSets });
      }
    },
  });
};

export const useUpdateSet = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Set,
    PgRError,
    {
      setId: number;
      updates: Partial<Omit<Set, "set_id" | "user_id" | "creation_date">>;
    }
  >({
    mutationFn: async ({ setId, updates }) => {
      const { data, error } = await postgrest
        .from("sets")
        .update(updates)
        .eq("set_id", setId)
        .select()
        .single();

      if (error) throw pgRErr(error);
      return data as Set;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sets"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.set(data.set_id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.publicSets });
      queryClient.invalidateQueries({ queryKey: ["folder-contents"] });
    },
  });
};

export const useDeleteSet = () => {
  const queryClient = useQueryClient();

  return useMutation<void, PgRError, number>({
    mutationFn: async (setId) => {
      const { error } = await postgrest
        .from("sets")
        .delete()
        .eq("set_id", setId);

      if (error) throw pgRErr(error);
    },
    onSuccess: (_, setId) => {
      queryClient.invalidateQueries({ queryKey: ["sets"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.set(setId) });
      queryClient.invalidateQueries({ queryKey: ["folder-contents"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.publicSets });
    },
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Card,
    PgRError,
    Omit<Card, "card_id" | "updated_at">
  >({
    mutationFn: async (card) => {
      const { data, error } = await postgrest
        .from("cards")
        .insert(card)
        .select()
        .single();

      if (error) throw pgRErr(error);
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

  return useMutation<
    Card,
    PgRError,
    {
      cardId: number;
      updates: Partial<Omit<Card, "card_id" | "set_id">>;
    }
  >({
    mutationFn: async ({ cardId, updates }) => {
      const { data, error } = await postgrest
        .from("cards")
        .update(updates)
        .eq("card_id", cardId)
        .select()
        .single();

      if (error) throw pgRErr(error);
      return data as Card;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards(data.set_id) });
    },
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { setId: number },
    PgRError,
    { cardId: number; setId: number }
  >({
    mutationFn: async ({ cardId, setId }) => {
      const { error } = await postgrest
        .from("cards")
        .delete()
        .eq("card_id", cardId);

      if (error) throw pgRErr(error);
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

  return useMutation<
    Progress,
    PgRError,
    {
      cardId: number;
      updates: Partial<Omit<Progress, "user_id" | "card_id">>;
    }
  >({
    mutationFn: async ({ cardId, updates }) => {
      const { data, error } = await postgrest
        .from("progress")
        .upsert({ card_id: cardId, ...updates })
        .select()
        .single();

      if (error) throw pgRErr(error);
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

  return useMutation<unknown, PgRError, number>({
    mutationFn: async (sourceSetId) => {
      const { data, error } = await postgrest.rpc("clone_public_set", {
        p_source_set_id: sourceSetId,
      });

      if (error) throw pgRErr(error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sets"] });
    },
  });
};

export const usePopulateGermanCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, PgRError, void>({
    mutationFn: async () => {
      const { data, error } = await postgrest.rpc("populate_german_course");

      if (error) throw pgRErr(error);
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

  return useMutation<unknown, PgRError, void>({
    mutationFn: async () => {
      const { data, error } = await postgrest.rpc("populate_english_verbs");

      if (error) throw pgRErr(error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sets"] });
    },
  });
};

export const useClearUserData = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, PgRError, void>({
    mutationFn: async () => {
      const { data, error } = await postgrest.rpc("clear_user_data");

      if (error) throw pgRErr(error);
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
