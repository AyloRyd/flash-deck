import { PostgrestClient } from "@supabase/postgrest-js";

export const postgrest = new PostgrestClient(import.meta.env.VITE_REST_URL);

export const setAccessToken = (token: string) => {
  postgrest.headers.set("Authorization", `Bearer ${token}`);
};

export const clearAccessToken = () => {
  if (postgrest.headers.get("Authorization")) {
    postgrest.headers.delete("Authorization");
  }
};
