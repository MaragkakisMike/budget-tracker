import Container from "@/src/components/Container";
import { FC, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import PieChartExpenses from "@/src/features/analysis/PieChartExpenses";
import useDatabase from "@/src/hooks/useDatabase";
import { useAnalysis } from "@/src/hooks/useAnalysis";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { useTranslation } from "react-i18next";
import { CategoriesGrid } from "@/src/features/analysis/CategoriesGrid";

type TimePeriod = "week" | "month" | "year";

const Analysis: FC = () => {
  const drizzleDB = useDatabase();
  const { colors } = useColors();
  const { styles } = useStyles(createStyles);
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("week");

  const { analytics, categories, isLoading } = useAnalysis(
    drizzleDB,
    selectedPeriod
  );

  const handlePeriodSelect = (period: TimePeriod) => {
    setSelectedPeriod(period);
  };

  const periodButtons = [
    { key: "week", label: t("common.thisWeek") },
    { key: "month", label: t("common.thisMonth") },
    { key: "year", label: t("common.thisYear") },
  ] as const;

  // Show loading state if needed
  if (isLoading) {
    return (
      <Container>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.textPrimary }]}>
            {t("common.loading")}
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <PieChartExpenses
        expenseCategories={categories.expenseCategories}
        totalExpense={analytics.totalExpense}
      />
      <View style={styles.periodSelector}>
        {periodButtons.map(({ key, label }) => (
          <Pressable
            key={key}
            style={[
              styles.periodButton,
              {
                backgroundColor:
                  selectedPeriod === key ? colors.primary : colors.background,
                borderColor:
                  selectedPeriod === key ? colors.primary : colors.border,
              },
            ]}
            onPress={() => handlePeriodSelect(key)}
          >
            <Text
              style={[
                styles.periodButtonText,
                {
                  color:
                    selectedPeriod === key ? colors.white : colors.textPrimary,
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
      <CategoriesGrid
        key={"expenseCategories"}
        categories={categories.expenseCategories}
      />
      <View
        style={{
          height: 1,
          backgroundColor: colors.gray,
          marginHorizontal: 10,
        }}
      />
      <CategoriesGrid
        key={"incTrscCategories"}
        categories={[
          {
            categoryId: -1,
            categoryName: t("transactions.income"),
            totalAmount: analytics.totalIncome,
            type: "income",
            color: colors.green,
            icon: "euro-sign",
          },
          {
            categoryId: -2,
            categoryName: t("transactions.transfers"),
            totalAmount: analytics.totalTransfer,
            type: "transfer",
            icon: "exchange-alt",
            color: colors.darkGray,
          },
        ]}
      />
    </Container>
  );
};

export default Analysis;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    periodSelector: {
      flexDirection: "row",
      backgroundColor: colors.cardBackground,
      padding: 4,
      paddingHorizontal: 10,
      gap: 5,
    },
    periodButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      minHeight: 44,
    },
    periodButtonText: {
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
    },
    cardsContainer: {
      padding: 10,
      gap: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      fontSize: 16,
      fontWeight: "500",
    },
  });
