import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import type { PressableProps } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TColors } from "../styles/colors";
import useStyles from "../hooks/useStyles";
import useColors from "../stores/theme-store";

interface ButtonProps extends PressableProps {
  title: string;
  icon?: keyof typeof FontAwesome5.glyphMap;
  iconPlacement?: "left" | "right";
  variant?: "primary" | "secondary" | "outline" | "outlineDanger";
  color?: string;
  style?: object;
}

export const Button = ({
  title,
  icon,
  iconPlacement = "right",
  variant = "primary",
  color,
  style,
  ...props
}: ButtonProps) => {
  const { styles } = useStyles(createStyles);
  const { colors } = useColors();
  return (
    <Pressable
      style={(pressed) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      {({ pressed }) => (
        <View style={styles.contentContainer}>
          {icon && iconPlacement === "left" && (
            <FontAwesome5
              name={icon}
              size={20}
              color={variant === "outline" ? colors.primary : colors.white}
              style={[styles.icon, styles.leftIcon]}
            />
          )}
          <Text
            style={[
              styles.text,
              variant === "outline" && styles.outlineText,
              variant === "outlineDanger" && styles.outlineDangerText,
              pressed && styles.pressedText,
            ]}
          >
            {title}
          </Text>
          {icon && iconPlacement === "right" && (
            <FontAwesome5
              name={icon}
              size={20}
              color={variant === "outline" ? colors.primary : colors.white}
              style={[styles.icon, styles.rightIcon]}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};
export default Button;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      width: "100%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    outline: {
      backgroundColor: colors.containerBackground,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    outlineDanger: {
      backgroundColor: colors.containerBackground,
      borderWidth: 2,
      borderColor: colors.red,
    },
    pressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    },
    contentContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
    outlineText: {
      color: colors.primary,
    },
    outlineDangerText: {
      color: colors.red,
    },
    pressedText: {
      opacity: 0.8,
    },
    icon: {
      opacity: 0.9,
    },
    leftIcon: {
      marginRight: 8,
    },
    rightIcon: {
      marginLeft: 8,
    },
  });
