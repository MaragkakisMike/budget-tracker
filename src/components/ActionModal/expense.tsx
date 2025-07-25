import { View, Text, ScrollView, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { FontAwesome5, Feather } from "@expo/vector-icons";

import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { createStyles } from "./actionStyles";
import { Account, Category } from "@/src/db/schema";
import { FormTextInput } from "@/src/components/FormComponents/input";
import { FormDropdownSelect } from "@/src/components/FormComponents/dropdown";
import { FormDatePicker } from "@/src/components/FormComponents/datePicker";
import Button from "@/src/components/Button";
import { useTranslation } from "react-i18next";
import { ExpenseFormData } from "@/src/interfaces/actions";
import { FormChipSelector } from "@/src/components/FormComponents/chipSelector";

type ExpenseFormProps = {
  categories: Category[];
  accounts?: Account[];
  initialValues?: Partial<ExpenseFormData>;
  onSubmit: (formData: ExpenseFormData) => void;
  onBack: () => void;
};

function ExpenseForm({
  categories,
  accounts = [],
  onSubmit,
  onBack,
  initialValues,
}: ExpenseFormProps) {
  const { t } = useTranslation();
  const { styles } = useStyles(createStyles);
  const { colors } = useColors();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    defaultValues: {
      amount: initialValues?.amount || "",
      title: initialValues?.title || "",
      categoryId: initialValues?.categoryId || null,
      accountId: initialValues?.accountId || null,
      date: initialValues?.date || new Date(),
    },
  });

  const onFormSubmit = (data: ExpenseFormData) => {
    onSubmit(data);
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <FontAwesome5 name="minus-circle" size={28} color={colors.primary} />
        <Text style={styles.formTitle}>{t("transactions.expense")}</Text>
      </View>

      <ScrollView style={styles.formScrollView}>
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
        />

        <FormTextInput
          control={control}
          name="title"
          label={t("form.label.title")}
          placeholder={t("form.placeholder.title")}
          error={errors.title}
          rules={{ required: t("form.error.title") }}
        />

        <FormChipSelector
          label={t("form.label.category")}
          chips={categories.map((cat) => ({
            label: cat.name,
            value: cat.id,
            color: cat.color,
          }))}
          control={control}
          name="categoryId"
        />

        <FormChipSelector
          label={t("form.label.account")}
          chips={accounts.map((acc) => ({
            label: acc.name,
            value: acc.id,
            color: colors.primary,
          }))}
          control={control}
          name="accountId"
          rules={{ required: t("form.error.account") }}
          error={errors.accountId}
        />

        <FormDatePicker
          control={control}
          name="date"
          label={t("form.date")}
          error={errors.date}
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
        />
      </View>
    </View>
  );
}

export default ExpenseForm;
