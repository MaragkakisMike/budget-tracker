import {
  getTotalValues,
  getBreakdownByCategory,
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

// This Week Services
export const thisWeekIncomeExpense = (drizzleDB: any) => {
  const { startDate, endDate } = getWeekRange();
  return getTotalValues(drizzleDB, startDate, endDate);
};

export const thisWeekBreakdownByCategory = (drizzleDB: any) => {
  const { startDate, endDate } = getWeekRange();
  return getBreakdownByCategory(drizzleDB, startDate, endDate);
};

// This Month Services
export const thisMonthIncomeExpense = (drizzleDB: any) => {
  const { startDate, endDate } = getMonthRange();
  return getTotalValues(drizzleDB, startDate, endDate);
};

export const thisMonthBreakdownByCategory = (drizzleDB: any) => {
  const { startDate, endDate } = getMonthRange();
  return getBreakdownByCategory(drizzleDB, startDate, endDate);
};

// This Year Services
export const thisYearIncomeExpense = (drizzleDB: any) => {
  const { startDate, endDate } = getYearRange();
  return getTotalValues(drizzleDB, startDate, endDate);
};

export const thisYearBreakdownByCategory = (drizzleDB: any) => {
  const { startDate, endDate } = getYearRange();
  return getBreakdownByCategory(drizzleDB, startDate, endDate);
};
