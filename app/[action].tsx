import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ExpenseForm from "@/src/components/ActionModal/expense";
import IncomeForm from "@/src/components/ActionModal/income";
import TransferForm from "@/src/components/ActionModal/transfer";
import { getAccounts } from "@/src/db/queries/accounts";
import { getCategories } from "@/src/db/queries/categories";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import useDatabase from "@/src/hooks/useDatabase";
import Container from "@/src/components/Container";
import {
  createTransaction,
  updateTransaction,
} from "@/src/db/mutations/transactions";
import { createTransfer, updateTransfer } from "@/src/db/mutations/transfers";
import useActionStore from "@/src/stores/actions-store";

const ActionPage = () => {
  const { action, isEdit } = useLocalSearchParams();
  const drizzleDB = useDatabase();
  const { selectedAction } = useActionStore();
  const { data: categories = [] } = useLiveQuery(getCategories(drizzleDB));
  const { data: accounts = [] } = useLiveQuery(getAccounts(drizzleDB));
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleSubmit = (data) => {
    let formData = {
      ...data,
      date: data.date.toISOString(),
      type: action,
    };
    if (action === "transfer") {
      formData.fromAccountName =
        accounts.find((acc) => acc.id === data?.fromAccountId)?.name || null;
      formData.toAccountName =
        accounts.find((acc) => acc.id === data?.toAccountId)?.name || null;
      createTransfer(drizzleDB, formData);
    } else {
      formData.categoryId =
        formData.type === "expense" ? data.categoryId || -1 : null;

      formData.accountName =
        accounts.find((acc) => acc.id === data?.accountId)?.name || null;

      formData.categoryName =
        categories.find((cat) => cat.id === data?.categoryId)?.name || null;
      createTransaction(drizzleDB, formData);
    }
    router.back();
  };

  const handleEdit = (data) => {
    let formData = {
      ...data,
      date: data.date.toISOString(),
      type: action,
    };

    if (action === "transfer") {
      formData.fromAccountName =
        accounts.find((acc) => acc.id === data?.fromAccountId)?.name || null;
      formData.toAccountName =
        accounts.find((acc) => acc.id === data?.toAccountId)?.name || null;

      updateTransfer(drizzleDB, selectedAction.id, formData);
    } else {
      formData.categoryId =
        formData.type === "expense" ? data.categoryId || -1 : null;

      formData.accountName =
        accounts.find((acc) => acc.id === data?.accountId)?.name || null;

      formData.categoryName =
        categories.find((cat) => cat.id === data?.categoryId)?.name || null;
      updateTransaction(drizzleDB, selectedAction.id, formData);
    }

    router.back();
  };

  const getFormProps = () => ({
    categories,
    accounts,
    initialValues: selectedAction,
    onSubmit: isEdit ? handleEdit : handleSubmit,
    onBack: handleBackPress,
  });

  const renderForm = () => {
    switch (action) {
      case "expense":
        return <ExpenseForm {...getFormProps()} />;
      case "income":
        return <IncomeForm {...getFormProps()} />;
      case "transfer":
        return <TransferForm {...getFormProps()} />;
      default:
        return null;
    }
  };
  return <Container>{renderForm()}</Container>;
};

export default ActionPage;
