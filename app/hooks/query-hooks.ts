import { useQuery } from "@tanstack/react-query";
import { postgrest, pgRErr, type PgRError } from "~/lib/postgrest";
import { queryKeys } from "./keys";
import type { Folder, Set, Card, Progress, FolderExtended } from "~/lib/types";

export const useFolder = (folderId: number | null) => {
  return useQuery({
    queryKey: queryKeys.folder(folderId!),
    queryFn: async () => {
      const { data, error } = await postgrest
        .from("folders")
        .select("*")
        .eq("folder_id", folderId)
        .single();

      if (error) throw pgRErr(error);
      return data as Folder;
    },
    enabled: !!folderId,
  });
};

export const useFolderPath = (folderId: number | null) => {
  return useQuery<Folder[], PgRError>({
    queryKey: queryKeys.folderPath(folderId!),
    queryFn: async () => {
      const path: Folder[] = [];
      let currentId: number | null = folderId;
      while (currentId != null) {
        const { data, error } = await postgrest
          .from("folders")
          .select("*")
          .eq("folder_id", currentId)
          .single();
        if (error) throw pgRErr(error);
        path.push(data as Folder);
        currentId = (data as Folder).parent_folder_id;
      }
      path.reverse();
      return path;
    },
    enabled: !!folderId,
  });
};

export const useFolders = (rootOnly?: boolean) => {
  return useQuery<FolderExtended[], PgRError>({
    queryKey: [...queryKeys.folders, rootOnly],
    queryFn: async () => {
      let query = postgrest
        .from("folders")
        .select("*, folder_stats")
        .order("folder_name");

      if (rootOnly) {
        query = query.is("parent_folder_id", null);
      }

      const { data, error } = await query;

      if (error) throw pgRErr(error);

      return data.map((item: any) => ({
        ...item,
        sets_count: item.folder_stats.total_sets,
        subfolders_count: item.folder_stats.total_subfolders,
      })) as FolderExtended[];
    },
  });
};

export const useFolderContents = (folderId: number) => {
  return useQuery<{ folders: FolderExtended[]; sets: Set[] }, PgRError>({
    queryKey: queryKeys.folderContents(folderId),
    queryFn: async () => {
      const [foldersResult, setsResult] = await Promise.all([
        postgrest
          .from("folders")
          .select(`*, sets(count), folders!parent_folder_id(count)`)
          .eq("parent_folder_id", folderId)
          .order("folder_name"),
        postgrest
          .from("sets")
          .select("*")
          .eq("folder_id", folderId)
          .order("set_name"),
      ]);

      if (foldersResult.error) throw pgRErr(foldersResult.error);
      if (setsResult.error) throw pgRErr(setsResult.error);

      const folders = foldersResult.data.map((item: any) => ({
        ...item,
        sets_count: item.sets[0].count,
        subfolders_count: item.folders[0].count,
      })) as FolderExtended[];

      return {
        folders,
        sets: setsResult.data as Set[],
      };
    },
    enabled: !!folderId,
  });
};

export const useSets = (folderId?: number) => {
  return useQuery<Set[], PgRError>({
    queryKey: queryKeys.sets(folderId),
    queryFn: async () => {
      let query = postgrest.from("sets").select("*").order("set_name");

      if (folderId !== undefined) {
        query = query.eq("folder_id", folderId);
      }

      const { data, error } = await query;

      if (error) throw pgRErr(error);
      return data as Set[];
    },
  });
};

export const useSet = (setId: number) => {
  return useQuery<Set, PgRError>({
    queryKey: queryKeys.set(setId),
    queryFn: async () => {
      const { data, error } = await postgrest
        .from("sets")
        .select("*")
        .eq("set_id", setId)
        .single();

      if (error) throw pgRErr(error);
      return data as Set;
    },
    enabled: !!setId,
  });
};

export const useCards = (setId: number) => {
  return useQuery<Card[], PgRError>({
    queryKey: queryKeys.cards(setId),
    queryFn: async () => {
      const { data, error } = await postgrest
        .from("cards")
        .select("*")
        .eq("set_id", setId)
        .order("card_id");

      if (error) throw pgRErr(error);
      return data as Card[];
    },
    enabled: !!setId,
  });
};

export const useProgress = (userId?: string) => {
  return useQuery<Progress[], PgRError>({
    queryKey: queryKeys.progress(userId),
    queryFn: async () => {
      let query = postgrest.from("progress").select("*");

      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query;

      if (error) throw pgRErr(error);
      return data as Progress[];
    },
  });
};

export const usePublicSets = () => {
  return useQuery<Set[], PgRError>({
    queryKey: queryKeys.publicSets,
    queryFn: async () => {
      const { data, error } = await postgrest
        .from("sets")
        .select("*")
        .eq("is_public", true)
        .order("creation_date", { ascending: false });

      if (error) throw pgRErr(error);
      return data as Set[];
    },
  });
};

export const useStudyQueue = (setId: number, limit?: number) => {
  return useQuery<Card[], PgRError>({
    queryKey: queryKeys.studyQueue(setId),
    queryFn: async () => {
      const { data, error } = await postgrest.rpc("get_study_queue", {
        p_set_id: setId,
        p_limit: limit,
      });

      if (error) throw pgRErr(error);
      return data as Card[];
    },
    enabled: !!setId,
  });
};

export const useSetMastery = (setId: number) => {
  return useQuery<number, PgRError>({
    queryKey: queryKeys.setMastery(setId),
    queryFn: async () => {
      const { data, error } = await postgrest
        .from("sets")
        .select("set_mastery")
        .eq("set_id", setId)
        .single();

      if (error) throw pgRErr(error);
      return data.set_mastery as number;
    },
    enabled: !!setId,
  });
};

export const useCardStatus = (cardId: number) => {
  return useQuery<string, PgRError>({
    queryKey: queryKeys.cardStatus(cardId),
    queryFn: async () => {
      const { data, error } = await postgrest
        .from("cards")
        .select("card_status")
        .eq("card_id", cardId)
        .single();

      if (error) throw pgRErr(error);
      return data.card_status as string;
    },
    enabled: !!cardId,
  });
};
