import Container from "@/src/components/Container";
import { FC } from "react";
import { Text } from "react-native";
import PieChartExpenses from "@/src/features/analysis/PieChartExpenses";
import useDatabase from "@/src/hooks/useDatabase";
import {
  getMonthlyBreakdownByCategory,
  getMonthlyIncomeExpense,
} from "@/src/db/queries/actions";
import { useTransactions } from "@/src/hooks/useTransactions";

const Analysis: FC = () => {
  const drizzleDB = useDatabase();
  useTransactions();
  const { expenseCategories } = getMonthlyBreakdownByCategory(drizzleDB);
  const { monthlyExpense } = getMonthlyIncomeExpense(drizzleDB);

  return (
    <Container>
      <PieChartExpenses
        expenseCategories={expenseCategories}
        monthlyExpense={monthlyExpense}
      />
    </Container>
  );
};

export default Analysis;
