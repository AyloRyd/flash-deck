import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { postgrest, setAccessToken } from "~/lib/postgrest";

export const useSyncUser = () => {
  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
    getAccessTokenSilently, 
  } = useAuth0();

  return useQuery({
    queryKey: ["sync-user", user?.sub],

    enabled: !isAuthLoading && isAuthenticated && !!user,

    queryFn: async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE, 
            scope: "openid profile email",
          },
        });
        
        setAccessToken(token);

        const { error } = await postgrest.rpc("sync_user", {
          p_username: user?.name || user?.email || "Unknown",
          p_avatar_url: user?.picture || "",
        });

        if (error) throw new Error(error.message);

        return true;
      } catch (error) {
        console.error("Auth error:", error);
        throw error;
      }
    },

    retry: 1,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
