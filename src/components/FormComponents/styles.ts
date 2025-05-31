import { TColors } from "@/src/styles/colors";
import { StyleSheet } from "react-native";
export const createStyles = (colors: TColors) =>
  StyleSheet.create({
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      marginBottom: 8,
      fontSize: 14,
      fontWeight: "500",
      color: colors.textPrimary,
    },
    input: {
      backgroundColor: colors.containerBackground,
      borderWidth: 1,
      borderColor: colors.textPrimary,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: colors.textPrimary,
    },
    inputError: {
      borderColor: colors.red,
    },
    errorText: {
      color: colors.red,
      fontSize: 12,
      marginTop: 4,
    },
    datePickerButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.containerBackground,
      borderWidth: 1,
      borderColor: colors.textPrimary,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      height: 48,
    },
    dateText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    chipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 8,
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      borderWidth: 2,
      marginRight: 8,
      marginBottom: 8,
    },
    chipText: {
      fontSize: 14,
      fontWeight: "500",
    },
  });
