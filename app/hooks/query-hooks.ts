import { useQuery } from "@tanstack/react-query";
import { postgrest } from "~/lib/postgrest";
import { queryKeys } from "./keys";
import type { Folder, Set, Card, Progress } from "~/lib/types";

export const useFolders = (rootOnly?: boolean) => {
  return useQuery({
    queryKey: [...queryKeys.folders, rootOnly],
    queryFn: async () => {
      let query = postgrest
        .from("folders")
        .select("*")
        .order("folder_name");
      
      if (rootOnly) {
        query = query.is("parent_folder_id", null);
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data as Folder[];
    },
  });
};

export const useFolder = (folderId: number | null) => {
  return useQuery({
    queryKey: queryKeys.set(folderId!),
    queryFn: async () => {
      const { data, error } = await postgrest
        .from("folders")
        .select("*")
        .eq("folder_id", folderId!)
        .single();
      if (error) throw new Error(error.message);
      return data as Folder;
    },
    enabled: folderId !== null,
  });
};

export const useSets = (folderId?: number) => {
  return useQuery({
    queryKey: queryKeys.sets(folderId),
    queryFn: async () => {
      let query = postgrest.from("sets").select("*").order("set_name");

      if (folderId !== undefined) {
        query = query.eq("folder_id", folderId);
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);
      return data as Set[];
    },
  });
};

export const useSet = (setId: number) => {
  return useQuery({
    queryKey: queryKeys.set(setId),
    queryFn: async () => {
      const { data, error } = await postgrest
        .from("sets")
        .select("*")
        .eq("set_id", setId)
        .single();

      if (error) throw new Error(error.message);
      return data as Set;
    },
    enabled: !!setId,
  });
};

export const useCards = (setId: number) => {
  return useQuery({
    queryKey: queryKeys.cards(setId),
    queryFn: async () => {
      const { data, error } = await postgrest
        .from("cards")
        .select("*")
        .eq("set_id", setId)
        .order("card_id");

      if (error) throw new Error(error.message);
      return data as Card[];
    },
    enabled: !!setId,
  });
};

export const useProgress = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.progress(userId),
    queryFn: async () => {
      let query = postgrest.from("progress").select("*");

      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);
      return data as Progress[];
    },
  });
};

export const usePublicSets = () => {
  return useQuery({
    queryKey: queryKeys.publicSets,
    queryFn: async () => {
      const { data, error } = await postgrest
        .from("sets")
        .select("*")
        .eq("is_public", true)
        .order("creation_date", { ascending: false });

      if (error) throw new Error(error.message);
      return data as Set[];
    },
  });
};

export const useStudyQueue = (setId: number, limit?: number) => {
  return useQuery({
    queryKey: queryKeys.studyQueue(setId),
    queryFn: async () => {
      const { data, error } = await postgrest.rpc("get_study_queue", {
        p_set_id: setId,
        p_limit: limit,
      });

      if (error) throw new Error(error.message);
      return data as Card[];
    },
    enabled: !!setId,
  });
};

export const useSetMastery = (setId: number) => {
  return useQuery({
    queryKey: queryKeys.setMastery(setId),
    queryFn: async () => {
      const { data, error } = await postgrest.rpc("set_mastery", {
        p_set: setId,
      });

      if (error) throw new Error(error.message);
      return data as number;
    },
    enabled: !!setId,
  });
};

export const useCardStatus = (cardId: number) => {
  return useQuery({
    queryKey: queryKeys.cardStatus(cardId),
    queryFn: async () => {
      const { data, error } = await postgrest.rpc("card_status", {
        p_card: cardId,
      });

      if (error) throw new Error(error.message);
      return data as string;
    },
    enabled: !!cardId,
  });
};
