import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import {
  getTotalValues,
  getTransfers,
  getBreakdownByCategory,
  processCategoryBreakdown,
  processTotalValues,
} from "@/src/db/queries/actions";

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

function getYearRange(date: Date = new Date()) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  firstDay.setHours(0, 0, 0, 0);

  const lastDay = new Date(date.getFullYear(), 11, 31);
  lastDay.setHours(23, 59, 59, 999);

  return {
    startDate: firstDay.toISOString(),
    endDate: lastDay.toISOString(),
  };
}

type TimePeriod = "week" | "month" | "year";

export const useAnalysis = (drizzleDB: any, period: TimePeriod) => {
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

  const { startDate, endDate } = getDateRange();

  const totalsQuery = getTotalValues(drizzleDB, startDate, endDate);
  const transfersQuery = getTransfers(drizzleDB, startDate, endDate);
  const breakdownQuery = getBreakdownByCategory(drizzleDB, startDate, endDate);

  const { data: rawTotals } = useLiveQuery(totalsQuery, [
    startDate,
    endDate,
    period,
  ]);
  const { data: rawTransfers } = useLiveQuery(transfersQuery, [
    startDate,
    endDate,
    period,
  ]);
  const { data: rawBreakdown } = useLiveQuery(breakdownQuery, [
    startDate,
    endDate,
    period,
  ]);

  const analytics = processTotalValues(rawTotals || [], rawTransfers || []);
  const categories = processCategoryBreakdown(rawBreakdown || []);

  return {
    analytics,
    categories,
    isLoading: !rawTotals || !rawTransfers || !rawBreakdown,
  };
};

export const useThisWeekAnalysis = (drizzleDB: any) => {
  return useAnalysis(drizzleDB, "week");
};

export const useThisMonthAnalysis = (drizzleDB: any) => {
  return useAnalysis(drizzleDB, "month");
};

export const useThisYearAnalysis = (drizzleDB: any) => {
  return useAnalysis(drizzleDB, "year");
};
