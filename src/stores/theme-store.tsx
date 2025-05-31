import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Appearance } from "react-native"; // Import Appearance API
import Colors, { TColors } from "@/src/styles/colors";

interface ThemeState {
  colors: TColors;
  isDarkMode: boolean; // New property to track dark mode
  toggleColorsChange: () => void;
  setSystemTheme: () => void; // New action to set theme based on system preference
}

const useColors = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        colors:
          Appearance.getColorScheme() === "dark" ? Colors.dark : Colors.light, // Initialize with system theme
        isDarkMode: Appearance.getColorScheme() === "dark", // Initialize isDarkMode
        toggleColorsChange: () =>
          set((state) => ({
            colors: state.colors === Colors.light ? Colors.dark : Colors.light,
            isDarkMode: !state.isDarkMode,
          })),
        setSystemTheme: () => {
          const isDark = Appearance.getColorScheme() === "dark";
          set({
            colors: isDark ? Colors.dark : Colors.light,
            isDarkMode: isDark,
          });
        },
      }),
      { name: "themeStore" }
    )
  )
);

export default useColors;
