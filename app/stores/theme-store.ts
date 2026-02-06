import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

const STORAGE_KEY = "flash-deck-theme";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
    }),
    { name: STORAGE_KEY }
  )
);

/** Run before React to avoid flash. Call from inline script in root. */
export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "dark";
    const parsed = JSON.parse(raw) as { state?: { theme?: Theme } };
    const theme = parsed?.state?.theme;
    return theme === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}
