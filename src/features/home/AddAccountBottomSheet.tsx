import { useEffect, FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FontAwesome5 } from "@expo/vector-icons";

import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { TColors } from "@/src/styles/colors";
import {
  createAccount,
  deleteAccount,
  updateAccount,
} from "@/src/db/mutations/accounts";
import useDatabase from "@/src/hooks/useDatabase";
import { BottomSheet } from "@/src/components/BottomSheet";
import { useTranslation } from "react-i18next";
import { FormTextInput } from "@/src/components/FormComponents/input";
import { Account } from "@/src/db/schema";
import Button from "@/src/components/Button";
import { LARGE_MARGIN, MEDIUM_MARGIN } from "@/src/constants";

interface AccountBottomSheetProps {
  bottomSheetModalRef: React.MutableRefObject<BottomSheetModal | null>;
  account?: Account;
  onSave?: () => void;
}

type AccountFormData = {
  name: string;
  balance: string;
};

export const AccountBottomSheet: FC<AccountBottomSheetProps> = ({
  bottomSheetModalRef,
  account,
  onSave,
}) => {
  const drizzleDB = useDatabase();
  const { t } = useTranslation();
  const { styles } = useStyles(createStyles);

  const isEditMode = !!account;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AccountFormData>({
    defaultValues: {
      name: "",
      balance: "",
    },
  });

  useEffect(() => {
    if (account) {
      reset({
        name: account.name,
        balance: account.balance.toString(),
      });
    } else {
      reset({
        name: "",
        balance: "",
      });
    }
  }, [account, reset]);

  const onSubmit = (data: AccountFormData) => {
    const balance = parseFloat(data.balance);

    if (isEditMode && account) {
      updateAccount(drizzleDB, account.id, {
        name: data.name,
        balance: balance,
      });
    } else {
      createAccount(drizzleDB, {
        name: data.name,
        balance: balance,
      });
    }
    reset();
    if (onSave) onSave();
    bottomSheetModalRef.current?.dismiss();
  };

  const handleDelete = () => {
    if (account) {
      deleteAccount(drizzleDB, account.id);
      bottomSheetModalRef.current?.dismiss();
    }
  };

  return (
    <BottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      title={
        isEditMode ? t("accounts.edit_account") : t("accounts.add_account")
      }
    >
      <FormTextInput
        control={control}
        name="name"
        label={t("accounts.account_name")}
        placeholder={t("accounts.account_name")}
        rules={{ required: t("accounts.error.name_required") }}
        error={errors.name}
      />

      <FormTextInput
        control={control}
        name="balance"
        label={t("accounts.initial_value")}
        placeholder={t("accounts.initial_value")}
        keyboardType="numeric"
        rules={{
          required: t("accounts.error.balance_required"),
          validate: (value) =>
            !isNaN(Number(value)) || t("accounts.error.invalid_number"),
        }}
        error={errors.balance}
      />

      <View style={styles.buttonsContainer}>
        {isEditMode && (
          // <TouchableOpacity
          //   style={[styles.saveButton, { backgroundColor: colors.red }]}
          //   onPress={handleDelete}
          // >
          //   <FontAwesome5 name="trash" color={colors.white} size={24} />
          //   <Text style={styles.saveButtonText}>{t("actions.delete")}</Text>
          // </TouchableOpacity>
          <Button
            title={t("actions.delete")}
            onPress={handleDelete}
            variant="outlineDanger"
            style={{ flex: 1 }}
          />
        )}
        {/* <TouchableOpacity
          style={[styles.saveButton, !isValid && styles.disabledButton]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <FontAwesome5 name="save" color={colors.white} size={24} />
          <Text style={styles.saveButtonText}>{t("actions.save")}</Text>
        </TouchableOpacity> */}
        <Button
          title={t("actions.save")}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          variant="primary"
          style={{ flex: 1 }}
        />
      </View>
    </BottomSheet>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    saveButton: {
      flexDirection: "row",
      borderRadius: 12,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      marginTop: MEDIUM_MARGIN,
      backgroundColor: colors.primary,
    },
    disabledButton: {
      opacity: 0.6,
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: "600",
      marginLeft: MEDIUM_MARGIN,
      color: colors.white,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: LARGE_MARGIN,
    },
  });

export default AccountBottomSheet;
