import { StyleSheet } from "react-native";
import { TColors } from "@/src/styles/colors";
import {
  DEFAULT_MARGIN,
  DEFAULT_PADDING,
  EXTRA_LARGE_GAP,
  EXTRA_SMALL_MARGIN,
  MEDIUM_MARGIN,
  MEDIUM_PADDING,
  SMALL_MARGIN,
  SMALL_PADDING,
} from "@/src/constants";

export const createStyles = (colors: TColors) =>
  StyleSheet.create({
    formContainer: {
      flex: 1,
      width: "100%",
      paddingHorizontal: DEFAULT_PADDING,
      paddingVertical: MEDIUM_PADDING,
    },
    formScrollView: {
      flex: 1,
      width: "100%",
    },
    formHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: DEFAULT_MARGIN,
    },
    formTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.textPrimary,
      flex: 1,
      marginLeft: MEDIUM_MARGIN,
    },
    closeButton: {
      padding: SMALL_PADDING,
    },
    inputContainer: {
      marginBottom: DEFAULT_MARGIN,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textPrimary,
      marginBottom: SMALL_MARGIN,
    },
    input: {
      backgroundColor: colors.containerBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.textPrimary,
      padding: MEDIUM_PADDING,
      fontSize: 16,
      color: colors.textPrimary,
    },
    dropdownContainer: {
      backgroundColor: colors.containerBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.textPrimary,
    },
    datePickerButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.containerBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.textPrimary,
      padding: MEDIUM_PADDING,
    },
    dateText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: DEFAULT_MARGIN,
    },
    button: {
      flex: 1,
      paddingVertical: MEDIUM_PADDING,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: EXTRA_SMALL_MARGIN,
    },
    cancelButton: {
      backgroundColor: colors.containerBackground,
      borderWidth: 1,
      borderColor: colors.textPrimary,
    },
    submitButton: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.textPrimary,
    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.white,
    },
    inputError: {
      borderColor: "red",
      borderWidth: 1,
    },
    errorText: {
      color: "red",
      fontSize: 12,
      marginTop: EXTRA_SMALL_MARGIN,
    },
    errorContainer: {
      backgroundColor: colors.red + "10",
      borderRadius: 8,
      padding: MEDIUM_PADDING,
      marginBottom: DEFAULT_MARGIN,
    },
    globalError: {
      color: colors.red,
      fontSize: 14,
      textAlign: "center",
      marginBottom: DEFAULT_MARGIN,
    },
  });

export const createModalStyles = (colors: TColors) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    modalContainer: {
      alignItems: "center",
      marginBottom: 90,
    },
    modalContent: {
      backgroundColor: colors.containerBackground,
      borderRadius: 25,
      padding: MEDIUM_PADDING,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: colors.primary,
      overflow: "hidden",
    },
    actionsContainer: {
      flexDirection: "row",
      gap: EXTRA_LARGE_GAP,
      justifyContent: "center",
      alignItems: "center",
      padding: DEFAULT_PADDING,
    },
    modalButton: {
      backgroundColor: colors.containerBackground,
      alignItems: "center",
      justifyContent: "center",
    },
    modalButtonText: {
      color: colors.textPrimary,
      fontSize: 12,
      marginTop: SMALL_MARGIN,
      textAlign: "center",
    },
    formWrapper: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
  });
