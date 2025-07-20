import CardContainer from "@/src/components/CardContainer";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { useTranslation } from "react-i18next";
import { thisMonthIncomeExpense } from "@/src/utils/analysis";
import useDatabase from "@/src/hooks/useDatabase";

import { useRef, useState } from "react";
import { useThisMonthAnalysis } from "@/src/hooks/useAnalysis";

const IncomeExpensesContainer = ({ onSelectAction }) => {
  const { colors } = useColors();
  const { styles } = useStyles(createStyles);
  const { t } = useTranslation();
  const drizzleDB = useDatabase();
  const [selectedAction, setSelectedAction] = useState<"income" | "expense">();
  const { analytics } = useThisMonthAnalysis(drizzleDB);
  console.log("🚀 ~ IncomeExpensesContainer ~ analytics:", analytics);
  const { totalIncome, totalExpense } = analytics;
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const indicatorColor = useRef(new Animated.Value(0)).current;

  const handleSelectAction = (action: "income" | "expense") => {
    const isDeselecting = selectedAction === action;

    Animated.timing(indicatorPosition, {
      toValue: isDeselecting ? 0 : action === "income" ? 1 : 2,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.parallel([
      Animated.timing(indicatorPosition, {
        toValue: isDeselecting ? 0 : action === "income" ? 1 : 2,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(indicatorColor, {
        toValue: action === "income" ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
    onSelectAction(action);
    setSelectedAction((prev) => (prev === action ? undefined : action));
  };

  const indicatorTranslateX = indicatorPosition.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["0%", "5%", "55%"],
  });

  const indicatorWidthValue = indicatorPosition.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["0%", "45%", "50%"],
  });
  const indicatorColorValue = indicatorColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.green, colors.red],
  });
  return (
    <CardContainer>
      <View style={styles.statsContainer}>
        <Pressable
          style={[styles.statBlock, { borderColor: "#e0e0e0" }]}
          onPress={() => {
            handleSelectAction("income");
          }}
        >
          <View
            style={[
              styles.iconContainer,
              {
                borderColor: colors.green,
                backgroundColor: "rgba(0, 255, 0, 0.1)",
              },
            ]}
          >
            <Ionicons name="trending-up" size={24} color={colors.green} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>{t("transactions.income")}</Text>
            <Text style={[styles.amount, { color: colors.green }]}>
              €{totalIncome}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.statBlock, { borderColor: "#e0e0e0" }]}
          onPress={() => {
            handleSelectAction("expense");
          }}
        >
          <View
            style={[
              styles.iconContainer,
              {
                borderColor: colors.red,
                backgroundColor: "rgba(255, 0, 0, 0.1)",
              },
            ]}
          >
            <Ionicons name="trending-down" size={24} color={colors.red} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>{t("transactions.expenses")}</Text>
            <Text style={[styles.amount, { color: colors.red }]}>
              €{totalExpense}
            </Text>
          </View>
        </Pressable>
      </View>
      <Animated.View
        style={[
          styles.indicator,

          {
            width: indicatorWidthValue,
            left: indicatorTranslateX,
            backgroundColor: indicatorColorValue,
          },
        ]}
      />
    </CardContainer>
  );
};

export default IncomeExpensesContainer;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },
    statBlock: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
      borderWidth: 2,
    },
    textContainer: {
      width: "auto",
    },
    label: {
      fontSize: 14,
      color: colors.textPrimary,
      marginBottom: 4,
    },
    amount: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.textPrimary,
    },
    indicator: {
      marginTop: 12,
      height: 1,
      position: "absolute",
      bottom: 10,
      borderRadius: 1.5,
    },
  });
