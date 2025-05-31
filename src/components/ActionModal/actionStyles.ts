import { StyleSheet } from "react-native";
import { TColors } from "@/src/styles/colors";

export const createStyles = (colors: TColors) =>
  StyleSheet.create({
    formContainer: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    formScrollView: {
      flex: 1,
      width: "100%",
    },
    formHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    formTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.textPrimary,
      flex: 1,
      marginLeft: 12,
    },
    closeButton: {
      padding: 4,
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textPrimary,
      marginBottom: 6,
    },
    input: {
      backgroundColor: colors.containerBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.textPrimary,
      padding: 12,
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
      padding: 12,
    },
    dateText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 4,
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
      marginTop: 4,
    },
    errorContainer: {
      backgroundColor: colors.red + "10",
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    globalError: {
      color: colors.red,
      fontSize: 14,
      textAlign: "center",
      marginBottom: 16,
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
      padding: 10,
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
      gap: 30,
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
    },
    modalButton: {
      backgroundColor: colors.containerBackground,
      alignItems: "center",
      justifyContent: "center",
    },
    modalButtonText: {
      color: colors.textPrimary,
      fontSize: 12,
      marginTop: 8,
      textAlign: "center",
    },
    formWrapper: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
  });
