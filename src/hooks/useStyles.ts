import { useMemo } from "react";
import { TColors } from "@/src/styles/colors";
import { StyleSheet } from "react-native";
import useColors from "@/src/stores/theme-store";

interface Styles<T extends StyleSheet.NamedStyles<T>> {
  colors: TColors;
  styles: T;
}

export default function <T extends StyleSheet.NamedStyles<T>>(
  createStyle: (colors: TColors) => T
): Styles<T> {
  const { colors } = useColors();

  return {
    colors: colors,
    styles: useMemo(() => createStyle(colors), [colors, createStyle]),
  };
}
