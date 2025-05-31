import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToStorage = async (base64: string, fileName: string) => {
  try {
    if (Platform.OS === "android") {
      return await exportWithSavedDirectory(base64, fileName);
    } else {
      return await exportToExcel(base64, fileName);
    }
  } catch (error) {
    console.error("Save to storage error:", error);
    throw error;
  }
};

export const selectExportDirectory = async () => {
  try {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      await AsyncStorage.setItem(
        "exportDirectoryUri",
        permissions.directoryUri
      );
      return permissions.directoryUri;
    }
  } catch (error) {
    console.error("Directory selection failed:", error);
  }
  return null;
};

const exportWithSavedDirectory = async (
  base64Data: string,
  fileName: string
) => {
  const savedDirectoryUri = await AsyncStorage.getItem("exportDirectoryUri");
  const isDirectoryExists = await checkIfDirectoryExists(savedDirectoryUri);
  if (isDirectoryExists) {
    const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
      savedDirectoryUri,
      fileName,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (await Sharing.isAvailableAsync()) {
      const localFileUri = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(localFileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(localFileUri, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "Share Excel File",
        UTI: "com.microsoft.excel.xlsx",
      });
    }

    return fileUri;
  } else {
    const selectedDirectory = await selectExportDirectory();
    if (selectedDirectory) {
      return await exportWithSavedDirectory(base64Data, fileName);
    } else {
      throw new Error("No export directory selected");
    }
  }
};

const checkIfDirectoryExists = async (directoryUri: string) => {
  if (!directoryUri) return false;

  try {
    await FileSystem.StorageAccessFramework.readDirectoryAsync(directoryUri);
    return true;
  } catch (error) {
    return false;
  }
};

const exportToExcel = async (base64Data: string, fileName: string) => {
  const fileUri = `${FileSystem.documentDirectory}${fileName}`;

  await FileSystem.writeAsStringAsync(fileUri, base64Data, {
    encoding: FileSystem.EncodingType.Base64,
  }).then(() => {
    Sharing.shareAsync(fileUri);
  });

  return fileUri;
};
