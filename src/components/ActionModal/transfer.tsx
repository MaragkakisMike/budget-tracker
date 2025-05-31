import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { FontAwesome5, Feather } from "@expo/vector-icons";

import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { createStyles } from "./actionStyles";
import { Account } from "@/src/db/schema";
import { FormTextInput } from "../FormComponents/input";
import { FormDropdownSelect } from "../FormComponents/dropdown";
import { FormDatePicker } from "../FormComponents/datePicker";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import { TransferFormData } from "@/src/interfaces/actions";
import FormChipSelector from "../FormComponents/chipSelector";

type TransferFormProps = {
  accounts?: Account[];
  initialValues?: Partial<TransferFormData>;
  onSubmit: (formData: TransferFormData) => void;
  onBack: () => void;
};

function TransferForm({
  accounts = [],
  onSubmit,
  onBack,
  initialValues,
}: TransferFormProps) {
  const { t } = useTranslation();
  const { styles } = useStyles(createStyles);
  const { colors } = useColors();

  const hasEnoughAccounts = accounts.length >= 2;
  const [notEnoughAccountsError, setNotEnoughAccountsError] = useState<
    string | null
  >(!hasEnoughAccounts ? t("form.error.notEnoughAccounts") : null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<TransferFormData>({
    defaultValues: {
      amount: initialValues?.amount || "",
      title: initialValues?.title || "",
      fromAccountId: initialValues?.fromAccountId || null,
      toAccountId: initialValues?.toAccountId || null,
      date: initialValues?.date || new Date(),
    },
  });

  const fromAccountId = watch("fromAccountId");
  const toAccountId = watch("toAccountId");

  // Update not enough accounts error when accounts change
  useEffect(() => {
    setNotEnoughAccountsError(
      !hasEnoughAccounts ? t("form.error.notEnoughAccounts") : null
    );
  }, [accounts.length, hasEnoughAccounts, t]);

  // This function will be called before form submission to validate accounts
  const validateAccounts = () => {
    if (fromAccountId && toAccountId && fromAccountId === toAccountId) {
      setError("toAccountId", {
        type: "manual",
        message: t("form.error.sameAccount"),
      });
      return false;
    }
    return true;
  };

  const onFormSubmit = (data: TransferFormData) => {
    if (!hasEnoughAccounts) {
      return;
    }

    // Validate accounts before submitting
    if (!validateAccounts()) {
      return;
    }

    onSubmit(data);
  };

  // Handle account selection changes
  const handleFromAccountChange = (accountId: number) => {
    setValue("fromAccountId", accountId);

    // Clear error if it exists and accounts are now different
    if (errors.toAccountId?.type === "manual" && accountId !== toAccountId) {
      clearErrors("toAccountId");
    }

    // Check if we need to set an error
    if (accountId === toAccountId) {
      setError("toAccountId", {
        type: "manual",
        message: t("form.error.sameAccount"),
      });
    }
  };

  const handleToAccountChange = (accountId: number) => {
    setValue("toAccountId", accountId);

    // Clear error if it exists and accounts are now different
    if (errors.toAccountId?.type === "manual" && accountId !== fromAccountId) {
      clearErrors("toAccountId");
    }

    // Check if we need to set an error
    if (accountId === fromAccountId) {
      setError("toAccountId", {
        type: "manual",
        message: t("form.error.sameAccount"),
      });
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <FontAwesome5 name="exchange-alt" size={24} color={colors.primary} />
        <Text style={styles.formTitle}>{t("transactions.transfer")}</Text>
      </View>

      <ScrollView style={styles.formScrollView}>
        {notEnoughAccountsError && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, styles.globalError]}>
              {notEnoughAccountsError}
            </Text>
          </View>
        )}

        <FormTextInput
          control={control}
          name="amount"
          label={t("form.amount")}
          placeholder="0.00"
          keyboardType="numeric"
          error={errors.amount}
          rules={{
            required: t("form.error.amount"),
            validate: (value) =>
              isNaN(Number(value))
                ? t("form.error.not_number")
                : Number(value) > 0 || t("form.error.less_than_zero"),
          }}
          disabled={!hasEnoughAccounts}
        />

        <FormTextInput
          control={control}
          name="title"
          label={t("form.label.title")}
          placeholder={t("form.placeholder.title")}
          error={errors.title}
          rules={{ required: t("form.error.title") }}
          disabled={!hasEnoughAccounts}
        />

        <FormChipSelector
          label={t("form.label.fromAccount")}
          chips={accounts.map((acc) => ({
            label: acc.name,
            value: acc.id,
            color: acc.id === toAccountId ? colors.disabled : colors.primary,
            disabled: acc.id === toAccountId,
          }))}
          control={control}
          name="fromAccountId"
          rules={{ required: t("form.error.account") }}
          error={errors.fromAccountId}
          onSelect={handleFromAccountChange}
        />

        <FormChipSelector
          label={t("form.label.toAccount")}
          chips={accounts.map((acc) => ({
            label: acc.name,
            value: acc.id,
            color: acc.id === fromAccountId ? colors.disabled : colors.primary,
            disabled: acc.id === fromAccountId,
          }))}
          control={control}
          name="toAccountId"
          rules={{ required: t("form.error.account") }}
          error={errors.toAccountId}
          onSelect={handleToAccountChange}
        />

        <FormDatePicker
          control={control}
          name="date"
          label={t("form.date")}
          error={errors.date}
          disabled={!hasEnoughAccounts}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title={t("actions.back")}
          onPress={onBack}
          variant="outline"
          style={{ flex: 1 }}
        />
        <Button
          title={t("actions.save")}
          onPress={handleSubmit(onFormSubmit)}
          style={{ flex: 1 }}
          disabled={!hasEnoughAccounts}
        />
      </View>
    </View>
  );
}

export default TransferForm;
