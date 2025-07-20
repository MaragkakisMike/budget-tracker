import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import {
  getTotalValues,
  getTransfers,
  getBreakdownByCategory,
  processCategoryBreakdown,
  processTotalValues,
} from "@/src/db/queries/actions";

// Utility functions to get date ranges
function getWeekRange(date: Date = new Date()) {
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return {
    startDate: startOfWeek.toISOString(),
    endDate: endOfWeek.toISOString(),
  };
}

function getMonthRange(date: Date = new Date()) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const nextMonthFirstDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1
  );

  return {
    startDate: firstDay.toISOString(),
    endDate: nextMonthFirstDay.toISOString(),
  };
}

function getYearRange(date: Date = new Date()) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const nextYearFirstDay = new Date(date.getFullYear() + 1, 0, 1);

  return {
    startDate: firstDay.toISOString(),
    endDate: nextYearFirstDay.toISOString(),
  };
}

type TimePeriod = "week" | "month" | "year";

export const useAnalysis = (drizzleDB: any, period: TimePeriod) => {
  // Get date range based on period
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

  // Live queries for the selected period
  const { data: rawTotals } = useLiveQuery(
    getTotalValues(drizzleDB, startDate, endDate)
  );

  const { data: rawTransfers } = useLiveQuery(
    getTransfers(drizzleDB, startDate, endDate)
  );

  const { data: rawBreakdown } = useLiveQuery(
    getBreakdownByCategory(drizzleDB, startDate, endDate)
  );

  // Process the raw data
  const analytics = processTotalValues(rawTotals || [], rawTransfers || []);
  const categories = processCategoryBreakdown(rawBreakdown || []);

  return {
    analytics,
    categories,
    isLoading: !rawTotals || !rawTransfers || !rawBreakdown,
  };
};

// Individual hooks for specific periods (if needed elsewhere)
export const useThisWeekAnalysis = (drizzleDB: any) => {
  return useAnalysis(drizzleDB, "week");
};

export const useThisMonthAnalysis = (drizzleDB: any) => {
  return useAnalysis(drizzleDB, "month");
};

export const useThisYearAnalysis = (drizzleDB: any) => {
  return useAnalysis(drizzleDB, "year");
};
