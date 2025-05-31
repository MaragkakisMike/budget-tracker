import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TextInputProps,
} from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { FontAwesome5 } from "@expo/vector-icons";
import useColors from "@/src/stores/theme-store";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";

export interface CustomInputProps extends Omit<TextInputProps, "style"> {
  icon?: keyof typeof FontAwesome5.glyphMap;
  isBottomSheet?: boolean;
  onInputRef?: (ref: TextInput | null) => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  icon,
  isBottomSheet = false,
  placeholder,
  placeholderTextColor,
  onInputRef,
  ...restProps
}) => {
  const { colors } = useColors();
  const { styles } = useStyles(createStyles);

  const InputComponent =
    isBottomSheet && Platform.OS === "ios" ? BottomSheetTextInput : TextInput;

  return (
    <View style={createStyles(colors).inputContainer}>
      {icon && (
        <FontAwesome5
          name={icon}
          size={24}
          color={colors.primary}
          style={styles.icon}
        />
      )}
      <InputComponent
        ref={onInputRef ? (ref) => onInputRef(ref) : undefined}
        style={createStyles(colors).input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || colors.textPrimary}
        {...restProps}
      />
    </View>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 12,
      marginBottom: 15,
      shadowColor: colors.textPrimary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      backgroundColor: colors.background,
    },
    input: {
      flex: 1,
      height: 50,
      fontSize: 16,
      color: colors.textPrimary,
    },
    icon: {
      marginLeft: 15,
      marginRight: 10,
    },
  });

export default CustomInput;
