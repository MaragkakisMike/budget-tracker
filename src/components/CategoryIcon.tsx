import { styles } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList";
import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TColors } from "../styles/colors";
import useStyles from "../hooks/useStyles";
import { EXTRA_SMALL_MARGIN } from "../constants";

export const CategoryIcon = ({ category, size = "sm" }) => {
  const { styles } = useStyles(createStyles);
  return (
    <View
      style={[
        styles.iconContainer,
        styles[size],
        { backgroundColor: `${category.color}20` },
      ]}
    >
      <FontAwesome5 name={category.icon} size={20} color={category.color} />
    </View>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: EXTRA_SMALL_MARGIN,
      borderRadius: 100 / 2,
      backgroundColor: "transparent",
    },
    xs: {
      width: 25,
      height: 25,
    },
    sm: {
      width: 40,
      height: 40,
    },
    md: {
      width: 50,
      height: 50,
    },
  });
