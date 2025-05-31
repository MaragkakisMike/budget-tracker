import { Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { format } from "date-fns";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import { CategoryIcon } from "@/src/components/CategoryIcon";
import { useTranslation } from "react-i18next";
import useColors from "@/src/stores/theme-store";
import { HistoryRecord } from "@/src/interfaces";
type FontAwsome5Type = keyof typeof FontAwesome5.glyphMap;

export const HistoryItem = ({ record }: { record: HistoryRecord }) => {
  const { t } = useTranslation();
  const { styles } = useStyles(createStyles);
  const { colors } = useColors();
  const isExpense = record.type === "expense";
  const isGeneralCategory = record.category?.id === -1;
  const formattedAmount = isExpense
    ? `-${record.amount.toFixed(2)}€`
    : `+${record.amount.toFixed(2)}€`;

  const recordDate = record.date === "{}" ? new Date() : new Date(record.date);

  if (!record.type) {
    return (
      <View style={styles.itemContainer}>
        <CategoryIcon
          category={{
            icon: "exchange-alt",
            color: colors.darkGray,
          }}
        />
        <View style={styles.detailsContainer}>
          <Text style={[styles.categoryText, { color: colors.black }]}>
            {record.title}
          </Text>
          <View style={{ flexDirection: "row", gap: 3 }}>
            <Text style={styles.dateText}>
              {format(new Date(record.date), "MMM d")} |
            </Text>
            <Text
              style={[
                styles.dateText,
                !record.fromAccount?.id ? styles.textDeleted : {},
              ]}
            >
              {record.fromAccount?.name}
            </Text>
            <Text style={styles.dateText}>to</Text>
            <Text
              style={[
                styles.dateText,
                !record.toAccount?.id ? styles.textDeleted : {},
              ]}
            >
              {record.toAccount?.name}
            </Text>
          </View>
        </View>

        <Text style={[styles.amountText]}>
          {`${record.amount.toFixed(2)}€`}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.itemContainer}>
      <CategoryIcon
        category={
          isGeneralCategory
            ? {
                icon: "question",
                color: colors.gray,
              }
            : record.category
            ? {
                icon: record.category?.icon as FontAwsome5Type,
                color: record.category?.color,
              }
            : {
                icon: "euro-sign",
                color: colors.green,
              }
        }
      />

      <View style={styles.detailsContainer}>
        <Text
          style={[
            styles.categoryText,
            {
              color: isGeneralCategory
                ? colors.gray
                : record.category?.color || colors.green,
            },
          ]}
        >
          {record.category?.name || t("transactions.income")}
        </Text>
        <Text style={styles.titleText}>{record.title}</Text>
        <Text style={styles.dateText}>
          {format(recordDate, "MMM d")} | {""}
          <Text style={[!record.account?.id ? styles.textDeleted : {}]}>
            {record.account?.name}
          </Text>
        </Text>
      </View>

      <Text
        style={[
          styles.amountText,
          isExpense ? styles.expenseText : styles.incomeText,
        ]}
      >
        {formattedAmount}
      </Text>
    </View>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      paddingVertical: 8,
      backgroundColor: colors.containerBackground,
      borderRadius: 10,
    },
    detailsContainer: {
      marginLeft: 12,
    },
    categoryText: {
      fontSize: 12,
      marginBottom: 2,
    },
    titleText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textPrimary,
    },
    dateText: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 2,
    },
    textDeleted: {
      textDecorationLine: "line-through",
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
  });
