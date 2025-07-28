import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import {
  getTotalValues,
  getTransfers,
  getBreakdownByCategory,
  processTransactionBreakdown,
  processTotalValues,
} from "@/src/db/queries/actions";
import { getAllTransactionYears } from "../db/queries/transactions";

function getWeekRange(date: Date = new Date()) {
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return {
    startDate: startOfWeek.toISOString(),
    endDate: endOfWeek.toISOString(),
  };
}

function getMonthRange(date: Date = new Date()) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay.setHours(0, 0, 0, 0);

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  lastDay.setHours(23, 59, 59, 999);

  return {
    startDate: firstDay.toISOString(),
    endDate: lastDay.toISOString(),
  };
}

function getYearRange(year?: number) {
  if (!year) {
    year = new Date().getFullYear();
  }
  const firstDay = new Date(year, 0, 1);
  firstDay.setHours(0, 0, 0, 0);

  const lastDay = new Date(year, 11, 31);
  lastDay.setHours(23, 59, 59, 999);

  return {
    startDate: firstDay.toISOString(),
    endDate: lastDay.toISOString(),
  };
}

type TimePeriod = "week" | "month" | "year";

export const useAnalysis = (
  drizzleDB: any,
  data: { year?: number; period?: TimePeriod; includeAllYears?: boolean }
) => {
  const { year, period, includeAllYears } = data;

  const getDateRange = () => {
    switch (period) {
      case "week":
        return getWeekRange();
      case "month":
        return getMonthRange();
      case "year":
        return getYearRange();
      default:
        return getWeekRange();
    }
  };

  const { startDate, endDate } = getYearRange(year);

  const totalsQuery = getTotalValues(drizzleDB, startDate, endDate);
  const transfersQuery = getTransfers(drizzleDB, startDate, endDate);
  const breakdownQuery = getBreakdownByCategory(drizzleDB, startDate, endDate);

  const { data: rawTotals } = useLiveQuery(totalsQuery, [startDate, endDate]);
  const { data: rawTransfers } = useLiveQuery(transfersQuery, [
    startDate,
    endDate,
  ]);
  const { data: rawBreakdown } = useLiveQuery(breakdownQuery, [
    startDate,
    endDate,
  ]);

  const analytics = processTotalValues(rawTotals || [], rawTransfers || []);
  const transactions = processTransactionBreakdown(rawBreakdown || []);
  let availableYears: Array<number> = [];

  if (includeAllYears) {
    const yearsResult = useLiveQuery(getAllTransactionYears(drizzleDB), []);
    const rawYears = includeAllYears ? yearsResult.data : null;

    availableYears = rawYears
      ? rawYears
          .map((transaction) => new Date(transaction.date).getFullYear())
          .filter((year, index, self) => self.indexOf(year) === index)
          .sort((a, b) => a - b)
      : [];
  }

  return {
    analytics,
    transactions,
    availableYears,
    isLoading:
      !rawTotals ||
      !rawTransfers ||
      !rawBreakdown ||
      (includeAllYears && !availableYears.length),
  };
};

export const useThisWeekAnalysis = (drizzleDB: any) => {
  return useAnalysis(drizzleDB, { period: "week" });
};

export const useThisMonthAnalysis = (drizzleDB: any) => {
  return useAnalysis(drizzleDB, { period: "month" });
};

export const useThisYearAnalysis = (drizzleDB: any) => {
  return useAnalysis(drizzleDB, { period: "year" });
};
