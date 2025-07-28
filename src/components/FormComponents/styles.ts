import {
  DEFAULT_MARGIN,
  EXTRA_SMALL_MARGIN,
  MEDIUM_PADDING,
  SMALL_GAP,
  SMALL_MARGIN,
  SMALL_PADDING,
} from "@/src/constants";
import { TColors } from "@/src/styles/colors";
import { StyleSheet } from "react-native";
export const createStyles = (colors: TColors) =>
  StyleSheet.create({
    inputContainer: {
      marginBottom: DEFAULT_MARGIN,
    },
    inputLabel: {
      marginBottom: SMALL_MARGIN,
      fontSize: 14,
      fontWeight: "500",
      color: colors.textPrimary,
    },
    input: {
      backgroundColor: colors.containerBackground,
      borderWidth: 1,
      borderColor: colors.textPrimary,
      borderRadius: 8,
      paddingHorizontal: MEDIUM_PADDING,
      paddingVertical: MEDIUM_PADDING,
      fontSize: 16,
      color: colors.textPrimary,
    },
    inputError: {
      borderColor: colors.red,
    },
    errorText: {
      color: colors.red,
      fontSize: 12,
      marginTop: EXTRA_SMALL_MARGIN,
    },
    datePickerButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.containerBackground,
      borderWidth: 1,
      borderColor: colors.textPrimary,
      borderRadius: 8,
      paddingHorizontal: MEDIUM_PADDING,
      paddingVertical: MEDIUM_PADDING,
      height: 48,
    },
    dateText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    chipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: SMALL_GAP,
      marginTop: SMALL_MARGIN,
    },
    chip: {
      paddingHorizontal: MEDIUM_PADDING,
      paddingVertical: SMALL_PADDING,
      borderRadius: 16,
      borderWidth: 2,
      marginRight: SMALL_MARGIN,
      marginBottom: SMALL_MARGIN,
    },
    chipText: {
      fontSize: 14,
      fontWeight: "500",
    },
  });
