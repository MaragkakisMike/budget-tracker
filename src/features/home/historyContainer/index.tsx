import CardContainer from "@/src/components/CardContainer";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { format } from "date-fns";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import { CategoryIcon } from "@/src/components/CategoryIcon";
import { useTranslation } from "react-i18next";
import { deleteTransaction } from "@/src/db/mutations/transactions";
import useDatabase from "@/src/hooks/useDatabase";
import { useCallback } from "react";
import SwipeableItem from "@/src/components/SwipeableItem";
import useColors from "@/src/stores/theme-store";
import { HistoryItem } from "./historyItem";
import { deleteTransfer } from "@/src/db/mutations/transfers";
import { ActionFormData } from "@/src/types/actions";
import { HistoryRecord } from "@/src/interfaces";
import useActionStore from "@/src/stores/actions-store";
import { useRouter } from "expo-router";
import {
  DEFAULT_GAP,
  EXTRA_SMALL_MARGIN,
  LARGE_PADDING,
  MEDIUM_MARGIN,
  SMALL_PADDING,
} from "@/src/constants";
type FontAwsome5Type = keyof typeof FontAwesome5.glyphMap;

const HistoryContainer = ({ transactions, transfers, selectedAction }) => {
  const { styles } = useStyles(createStyles);
  const { t } = useTranslation();
  const drizzleDB = useDatabase();
  const { colors } = useColors();
  const router = useRouter();
  const { setSelectedAction } = useActionStore();
  const handleDeleteTransaction = useCallback((id) => {
    deleteTransaction(drizzleDB, id);
  }, []);

  const handleDeleteTransfer = useCallback((transfer) => {
    deleteTransfer(drizzleDB, transfer);
  }, []);

  const handlePressTransaction = useCallback((record: HistoryRecord) => {
    const actionData: ActionFormData = {
      id: record.id,
      type: record.type || "transfer",
      title: record.title,
      amount: record.amount.toString(),
      date: new Date(record.date),
      categoryId: record.categoryId,
      accountId: record.accountId,
      fromAccountId: record?.fromAccount?.id,
      toAccountId: record?.toAccount?.id,
    };

    const filteredData = Object.fromEntries(
      Object.entries(actionData).filter(
        ([, value]) => value !== null && value !== undefined
      )
    );
    setSelectedAction(filteredData as ActionFormData);
    router.navigate(`/action/${record.type || "transfer"}?isEdit=true`);
  }, []);

  const filteredTransactions = transactions
    ? transactions.filter((record) =>
        selectedAction ? record.type === selectedAction : true
      )
    : [];

  return (
    <CardContainer title={t("navigation.history")}>
      {filteredTransactions.length > 0 && (
        <FlatList
          scrollEnabled={false}
          data={filteredTransactions}
          renderItem={({ item }) => (
            <SwipeableItem
              onRightSwipe={() => handleDeleteTransaction(item.id)}
              onPress={() => handlePressTransaction(item)}
            >
              <HistoryItem record={item} />
            </SwipeableItem>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: colors.textSecondary + "30",
              }}
            />
          )}
        />
      )}
      {!!filteredTransactions.length && !!transfers.length && (
        <View
          style={{
            height: 3,
            width: "100%",
            backgroundColor: colors.textSecondary + "30",
          }}
        />
      )}
      {transfers.length > 0 && (
        <FlatList
          scrollEnabled={false}
          data={transfers}
          renderItem={({ item }) => (
            <SwipeableItem
              onRightSwipe={() => handleDeleteTransfer(item)}
              onPress={() => handlePressTransaction(item)}
            >
              <HistoryItem record={item} />
            </SwipeableItem>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: colors.textSecondary + "30",
              }}
            />
          )}
        />
      )}
      {!filteredTransactions.length && !transfers.length && (
        <Text style={styles.noDataText}>{t("general.noTransactions")}</Text>
      )}
    </CardContainer>
  );
};

export default HistoryContainer;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    historyContainer: {
      width: "100%",
      gap: DEFAULT_GAP,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      paddingVertical: SMALL_PADDING,
      backgroundColor: colors.containerBackground,
      borderRadius: 10,
    },
    detailsContainer: {
      marginLeft: MEDIUM_MARGIN,
    },
    categoryText: {
      fontSize: 12,
      marginBottom: EXTRA_SMALL_MARGIN,
    },
    titleText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textPrimary,
    },
    dateText: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: EXTRA_SMALL_MARGIN,
    },
    amountText: {
      fontSize: 14,
      fontWeight: "600",
      marginLeft: "auto",
    },
    expenseText: {
      color: colors.red,
    },
    incomeText: {
      color: colors.green,
    },
    noDataText: {
      textAlign: "center",
      color: colors.textSecondary,
      padding: LARGE_PADDING,
    },
  });
