export type ColorTheme = {
  [key: string]: string;
};

const sharedColors = {
  white: "#FFFFFF",
  black: "#1A1A1A",
  gray: "#B0B3B8",
  darkGray: "#7A7D85",
  primary: "#4A90E2",
  green: "#2ECC71",
  red: "#E84142",
  trackOnColor: "#34C759",
  thumbColor: "#FFFFFF",
  disabled: "#B0B3B8",
};

type SharedColors = typeof sharedColors;

export type TColors = ColorTheme & SharedColors;

type ColorPalettes = {
  light: TColors;
  dark: TColors;
};

const Colors: ColorPalettes = {
  dark: {
    secondary: "#2A2E37",
    background: "#181A20",
    primaryLight: "#1A1D24",
    containerBackground: "#242731",
    textPrimary: sharedColors.white,
    textSecondary: "#A0A4B0",
    textComplement: sharedColors.black,
    modalShadow: "rgba(0, 0, 0, 0.85)",
    trackOffColor: "#39393D",
    sectionBackground: "#242731",
    border: "#3B3F48",
    ...sharedColors,
  },
  light: {
    secondary: "#D8DEE9",
    background: "#F0F4F8",
    primaryLight: "#E3F2FD",
    containerBackground: "#FFFFFF",
    textPrimary: "#2D3436",
    textSecondary: "#636E72",
    textComplement: sharedColors.white,
    modalShadow: "rgba(0, 0, 0, 0.2)",
    trackOffColor: "#E9E9EA",
    sectionBackground: "#FFFFFF",
    border: "#D1D5DB",
    ...sharedColors,
  },
};

export default Colors;
