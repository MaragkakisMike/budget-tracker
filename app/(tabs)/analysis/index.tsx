import Container from "@/src/components/Container";
import { FC, useCallback, useState, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import PieChartExpenses from "@/src/features/analysis/PieChartExpenses";
import useDatabase from "@/src/hooks/useDatabase";
import { useAnalysis } from "@/src/hooks/useAnalysis";
import useColors from "@/src/stores/theme-store";
import { useTranslation } from "react-i18next";
import ContentDividerLoadmoreButton from "@/src/components/ContentDeviderShowHistoryButton";
import { YearSelector } from "@/src/features/analysis/YearSelector";
import { DEFAULT_GAP, DEFAULT_PADDING } from "@/src/constants";

type TimePeriod = "week" | "month" | "year";

const Analysis: FC = () => {
  const drizzleDB = useDatabase();
  const { colors } = useColors();
  const { t } = useTranslation();
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const { analytics, transactions, isLoading, availableYears } = useAnalysis(
    drizzleDB,
    {
      year: selectedYear,
      includeAllYears: true,
    }
  );

  const years = useMemo(() => {
    return availableYears || [];
  }, [availableYears]);

  const handleHistoryVisibility = useCallback(() => {
    setIsHistoryVisible((prev) => !prev);
  }, []);

  const handleYearSelection = useCallback((year: number) => {
    setSelectedYear(year);
    setIsHistoryVisible(false);
  }, []);

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
      <YearSelector
        years={years}
        selectedYear={selectedYear}
        handleYearSelection={handleYearSelection}
      />
      <PieChartExpenses
        expenseCategories={transactions.expenseTransactions}
        totalExpense={analytics.totalExpense}
      />
      <ContentDividerLoadmoreButton
        isVisible={isHistoryVisible}
        toggleVisibility={handleHistoryVisibility}
      />
    </Container>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  cardsContainer: {
    padding: DEFAULT_PADDING,
    gap: DEFAULT_GAP,
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
