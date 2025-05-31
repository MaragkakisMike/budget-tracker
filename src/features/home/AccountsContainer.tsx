import React, { FC, useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { DEFAULT_PADDING } from "../../constants";
import { getAccounts } from "@/src/db/queries/accounts";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import useDatabase from "@/src/hooks/useDatabase";
import { deleteAccount } from "@/src/db/mutations/accounts";
import AccountBottomSheet from "./AddAccountBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { db } from "@/src/db/client";
import { eq } from "drizzle-orm";
import { Account } from "@/src/db/schema";

const AccountsContainer = () => {
  const drizzleDB = useDatabase();
  const { data: accounts } = useLiveQuery(getAccounts(drizzleDB));
  const { styles } = useStyles(createStyles);
  const { colors } = useColors();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handlePress = (account: Account) => {
    setSelectedAccount(account);
    setIsEditing(true);
    bottomSheetModalRef.current?.present();
  };

  const handleAddAccount = () => {
    setSelectedAccount(null);
    setIsEditing(false);
    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <Text style={styles.sectionTitle}>{t("general.overview")}</Text>
          <Icon name="menu" size={30} color={colors.textPrimary} />
        </View>
        <ScrollView horizontal style={{ paddingBottom: 4 }}>
          {accounts.map((item, index) => (
            <Pressable
              style={styles.account}
              key={index}
              onPress={() => handlePress(item)}
              delayLongPress={500}
            >
              <Text style={styles.accountTitle}>{item.name}</Text>
              <Text style={styles.accountValue}>€{item.balance}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.addBtnContainer} onPress={handleAddAccount}>
            <Icon
              name="add"
              size={30}
              style={{
                padding: 25,
              }}
              color={colors.primary}
            />
          </Pressable>
        </ScrollView>
      </View>
      <AccountBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        account={selectedAccount}
        onSave={() => {
          setSelectedAccount(null);
          setIsEditing(false);
        }}
      />
    </>
  );
};

export default AccountsContainer;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.containerBackground,
      padding: DEFAULT_PADDING,
      gap: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    topHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    accountsContainer: {
      width: "100%",
      marginTop: 10,
    },
    addBtnContainer: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 10,
    },
    account: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 10,
      alignItems: "center",
      marginRight: 10,
    },
    accountTitle: {
      fontSize: 16,
      color: colors.white,
    },
    accountValue: {
      fontSize: 18,
      color: colors.white,
      fontWeight: "bold",
    },
    sectionTitle: {
      fontSize: 24,
      color: colors.textPrimary,
    },
  });
