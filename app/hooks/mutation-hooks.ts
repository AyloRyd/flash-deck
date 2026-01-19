import { useMutation } from "@tanstack/react-query";
import { postgrest, pgRErr, type PgRError } from "~/lib/postgrest";
import { invalidateKeys, queryKeys } from "./keys";
import type { Folder, Set, Card, Progress } from "~/lib/types";

export const useCreateFolder = () => {
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
      invalidateKeys([
        queryKeys.folders,
        data.parent_folder_id
          ? queryKeys.folderContents(data.parent_folder_id)
          : null,
      ]);
    },
  });
};

export const useUpdateFolder = () => {
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
      invalidateKeys([
        queryKeys.folders,
        queryKeys.folder(data.folder_id),
        data.parent_folder_id
          ? queryKeys.folderContents(data.parent_folder_id)
          : null,
      ]);
    },
  });
};

export const useDeleteFolder = () => {
  return useMutation<void, PgRError, number>({
    mutationFn: async (folderId) => {
      const { error } = await postgrest
        .from("folders")
        .delete()
        .eq("folder_id", folderId);

      if (error) throw pgRErr(error);
    },
    onSuccess: () => {
      invalidateKeys([
        queryKeys.folders, 
        ["folder-contents"]
      ]);
    },
  });
};

export const useCreateSet = () => {
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
      invalidateKeys([
        ["sets"],
        data.folder_id ? queryKeys.folderContents(data.folder_id) : null,
        data.is_public ? queryKeys.publicSets : null,
      ]);
    },
  });
};

export const useUpdateSet = () => {
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
      invalidateKeys([
        ["sets"],
        queryKeys.set(data.set_id),
        queryKeys.publicSets,
        queryKeys.folders,
        ["folder-contents"],
      ]);
    },
  });
};

export const useDeleteSet = () => {
  return useMutation<void, PgRError, number>({
    mutationFn: async (setId) => {
      const { error } = await postgrest
        .from("sets")
        .delete()
        .eq("set_id", setId);

      if (error) throw pgRErr(error);
    },
    onSuccess: (_, setId) => {
      invalidateKeys([
        ["sets"],
        queryKeys.set(setId),
        ["folder-contents"],
        queryKeys.publicSets,
      ]);
    },
  });
};

export const useCreateCard = () => {
  return useMutation<Card, PgRError, Omit<Card, "card_id" | "updated_at">>({
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
      invalidateKeys([
        queryKeys.cards(data.set_id),
        queryKeys.studyQueue(data.set_id),
      ]);
    },
  });
};

export const useUpdateCard = () => {
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
      invalidateKeys([
        queryKeys.cards(data.set_id)
      ]);
    },
  });
};

export const useDeleteCard = () => {
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
      invalidateKeys([
        queryKeys.cards(data.setId),
        queryKeys.studyQueue(data.setId),
        ["progress"],
      ]);
    },
  });
};

export const useUpdateProgress = () => {
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
      invalidateKeys([
        ["progress"],
        ["study-queue"],
        ["set-mastery"],
        ["card-status"],
      ]);
    },
  });
};

export const useClonePublicSet = () => {
  return useMutation<unknown, PgRError, number>({
    mutationFn: async (sourceSetId) => {
      const { data, error } = await postgrest.rpc("clone_public_set", {
        p_source_set_id: sourceSetId,
      });

      if (error) throw pgRErr(error);
      return data;
    },
    onSuccess: () => {
      invalidateKeys([
        ["sets"]
      ]);
    },
  });
};

export const usePopulateGermanCourse = () => {
  return useMutation<unknown, PgRError, void>({
    mutationFn: async () => {
      const { data, error } = await postgrest.rpc("populate_german_course");

      if (error) throw pgRErr(error);
      return data;
    },
    onSuccess: () => {
      invalidateKeys([
        queryKeys.folders, 
        ["sets"]
      ]);
    },
  });
};

export const usePopulateEnglishVerbs = () => {
  return useMutation<unknown, PgRError, void>({
    mutationFn: async () => {
      const { data, error } = await postgrest.rpc("populate_english_verbs");

      if (error) throw pgRErr(error);
      return data;
    },
    onSuccess: () => {
      invalidateKeys([
        ["sets"]
      ]);
    },
  });
};

export const useClearUserData = () => {
  return useMutation<unknown, PgRError, void>({
    mutationFn: async () => {
      const { data, error } = await postgrest.rpc("clear_user_data");

      if (error) throw pgRErr(error);
      return data;
    },
    onSuccess: () => {
      invalidateKeys([
        queryKeys.folders,
        ["sets"],
        ["cards"],
        ["progress"],
      ]);
    },
  });
};
