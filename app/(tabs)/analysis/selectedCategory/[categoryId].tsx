import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import Container from "@/src/components/Container";
import { useLocalSearchParams } from "expo-router";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import useDatabase from "@/src/hooks/useDatabase";
import { getExpensesByCategory } from "@/src/db/queries/actions";
import HistoryContainer from "@/src/features/home/historyContainer";
import { DEFAULT_GAP, DEFAULT_PADDING } from "@/src/constants";

const SelectedCategory = () => {
  const { categoryId } = useLocalSearchParams();
  const drizzleDB = useDatabase();
  const { data: expenses = [] } = useLiveQuery(
    getExpensesByCategory(drizzleDB, parseInt(categoryId as string))
  );

  const formatedExpenses = useMemo(() => {
    return expenses.map((expense) => ({
      ...expense,
      account: {
        id: expense.accountId,
        name: expense.accountName,
      },
      category: {
        id: expense.categoryId,
        name: expense.categoryName,
        icon: expense.categoryIcon,
        color: expense.categoryColor,
      },
    }));
  }, [expenses]);

  return (
    <Container>
      <View
        style={{
          paddingHorizontal: DEFAULT_PADDING,
          gap: DEFAULT_GAP,
        }}
      >
        <HistoryContainer
          transactions={formatedExpenses}
          transfers={[]}
          selectedAction={"expense"}
        />
      </View>
    </Container>
  );
};

export default SelectedCategory;

const styles = StyleSheet.create({});
