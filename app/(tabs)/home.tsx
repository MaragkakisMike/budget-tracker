import { useRef, useCallback, useState, useEffect } from "react";
import Container from "@/src/components/Container";
import AccountsContainer from "@/src/features/home/AccountsContainer";
import IncomeExpensesContainer from "@/src/features/home/IncomeExpensesContainer";
import HistoryContainer from "@/src/features/home/historyContainer";
import { View } from "react-native";
import useDatabase from "@/src/hooks/useDatabase";
import { getTransactions } from "@/src/db/queries/transactions";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useTransactions } from "@/src/hooks/useTransactions";

export default function HomePage() {
  const [selectedAction, setSelectedAction] = useState<"income" | "expense">();
  const { transactions, transfers } = useTransactions();

  const handleSelectAction = useCallback((action: "income" | "expense") => {
    setSelectedAction(
      (prev) => (prev === action ? undefined : action) as "income" | "expense"
    );
  }, []);
  return (
    <Container>
      <AccountsContainer />
      <View
        style={{
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <IncomeExpensesContainer onSelectAction={handleSelectAction} />
        <HistoryContainer
          transactions={transactions}
          transfers={transfers}
          selectedAction={selectedAction}
        />
      </View>
    </Container>
  );
}
