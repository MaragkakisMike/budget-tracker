import { utils, write } from "xlsx";
import { Alert } from "react-native";
import { getAccounts } from "../db/queries/accounts";
import { getCategories } from "../db/queries/categories";
import { getTransactions } from "../db/queries/transactions";
import { getTransfers } from "../db/queries/transfers";
import useDatabase from "./useDatabase";
import { saveToStorage } from "../utils/storage";
import { formatDate } from "date-fns";

export const useXlsx = () => {
  const drizzleDb = useDatabase();

  const handleExportData = async () => {
    try {
      const accounts = await getAccounts(drizzleDb);
      const categories = await getCategories(drizzleDb);
      const transactions = await getTransactions(drizzleDb);
      const transfers = await getTransfers(drizzleDb);

      const wb = utils.book_new();
      utils.book_append_sheet(wb, utils.json_to_sheet(accounts), "Accounts");
      utils.book_append_sheet(
        wb,
        utils.json_to_sheet(categories),
        "Categories"
      );
      utils.book_append_sheet(wb, utils.json_to_sheet(transfers), "Transfers");
      utils.book_append_sheet(
        wb,
        utils.json_to_sheet(transactions),
        "Transactions"
      );

      const base64 = write(wb, { type: "base64" });
      const fileName = getFileName(PERIODS.MONTHLY);

      saveToStorage(base64, fileName);
    } catch (error) {
      console.error("Export error:", error);
      Alert.alert("Export Failed", error.message);
      return { success: false, error: error.message };
    }
  };

  return { handleExportData };
};

const PERIODS = {
  MONTHLY: "monthly",
  YEARLY: "yearly",
  MONTH_TO_DATE: "monthToDate",
  YEAR_TO_DATE: "yearToDate",
  ALL_TIME: "allTime",
  CUSTOM_MONTH: "customMonth",
  CUSTOM_YEAR: "customYear",
};

const getFileName = (period: string) => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  switch (period) {
    case PERIODS.MONTHLY:
      return `Budget ${month} ${year}.xlsx`;
    case PERIODS.YEARLY:
      return `Budget ${year}.xlsx`;
    case PERIODS.MONTH_TO_DATE:
      return `Budget ${month} ${year} MTD.xlsx`;
    case PERIODS.YEAR_TO_DATE:
      return `Budget ${year} YTD.xlsx`;
    case PERIODS.ALL_TIME:
      return "Budget All Time.xlsx";
    case PERIODS.CUSTOM_MONTH:
      return `Budget ${month} ${year}.xlsx`;
    case PERIODS.CUSTOM_YEAR:
      return `Budget ${year}.xlsx`;
    default:
      return "Budget.xlsx";
  }
};
