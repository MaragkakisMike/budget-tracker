import React, { FC } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { Ionicons } from "@expo/vector-icons";
import { LARGE_PADDING, DEFAULT_PADDING } from "../constants";

interface CustomProps {
  title?: string;
  children?: React.ReactNode;
  icon?: keyof typeof Ionicons.glyphMap;
  handleCardHeaderAction?: () => void;
}

const CardContainer: FC<CustomProps> = ({
  title,
  children,
  icon,
  handleCardHeaderAction,
}) => {
  const { styles } = useStyles(createStyles);
  const { colors } = useColors();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        {icon && handleCardHeaderAction ? (
          <Pressable onPress={handleCardHeaderAction}>
            <Ionicons name={icon} size={30} color={colors.textPrimary} />
          </Pressable>
        ) : (
          icon && <Ionicons name={icon} size={30} color={colors.textPrimary} />
        )}
      </View>
      {children}
    </View>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: colors.containerBackground,
      borderRadius: 16,
      padding: LARGE_PADDING,
      paddingTop: DEFAULT_PADDING,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    title: {
      fontSize: 24,
      color: colors.textPrimary,
      alignSelf: "flex-start",
      // top: -10,
    },
  });

export default CardContainer;
