import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { ScrollView } from "react-native-gesture-handler";
import { DEFAULT_GAP, LARGE_PADDING } from "../constants";

function Container(props) {
  const { styles } = useStyles(createStyles);
  const { colors, isDarkMode } = useColors();

  return (
    <SafeAreaView style={[styles.safeContainer]} edges={["top"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          backgroundColor={colors.containerBackground}
          barStyle={isDarkMode ? "light-content" : "dark-content"}
        />
        <View style={styles.container}>{props.children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: colors.containerBackground,
    },
    container: {
      flex: 1,
      gap: DEFAULT_GAP,
      paddingBottom: LARGE_PADDING,
      backgroundColor: colors.background,
    },
  });

export default Container;
