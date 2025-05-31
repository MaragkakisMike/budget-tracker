import { sql } from "drizzle-orm";
import { eq, and, gte, lt } from "drizzle-orm";
import { transactions, categories } from "@/src/db/schema";

// Utility function to get the start and end of a month
function getMonthRange(date: Date) {
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

export const getTotalIncomeExpense = (drizzleDB: any) => {
  const result = drizzleDB
    .select({
      totalIncome:
        sql<number>`SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END)`.mapWith(
          Number
        ),
      totalExpense:
        sql<number>`SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)`.mapWith(
          Number
        ),
    })
    .from(transactions)
    .get();

  return {
    totalIncome: result.totalIncome || 0,
    totalExpense: result.totalExpense || 0,
    netBalance: (result.totalIncome || 0) - (result.totalExpense || 0),
  };
};

export const getMonthlyIncomeExpense = (
  drizzleDB: any,
  date: Date = new Date()
) => {
  const { startDate, endDate } = getMonthRange(date);

  const result = drizzleDB
    .select({
      monthlyIncome:
        sql<number>`SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END)`.mapWith(
          Number
        ),
      monthlyExpense:
        sql<number>`SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)`.mapWith(
          Number
        ),
    })
    .from(transactions)
    .where(
      and(gte(transactions.date, startDate), lt(transactions.date, endDate))
    )
    .get();

  return {
    monthlyIncome: result.monthlyIncome || 0,
    monthlyExpense: result.monthlyExpense || 0,
    monthlyNetBalance:
      (result.monthlyIncome || 0) - (result.monthlyExpense || 0),
  };
};

export const getMonthlyBreakdownByCategory = (
  drizzleDB: any,
  date: Date = new Date()
) => {
  const { startDate, endDate } = getMonthRange(date);

  const categoryBreakdown = drizzleDB
    .select({
      categoryId: transactions.categoryId,
      categoryName: categories.name,
      totalAmount: sql<number>`SUM(amount)`.mapWith(Number),
      type: transactions.type,
      color: categories.color,
    })
    .from(transactions)
    .innerJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(gte(transactions.date, startDate), lt(transactions.date, endDate))
    )
    .groupBy(transactions.categoryId, categories.name, transactions.type)
    .all();

  if (!categoryBreakdown || categoryBreakdown.length === 0) {
    return {
      incomeCategories: [],
      expenseCategories: [],
    };
  }

  const incomeCategories = categoryBreakdown.filter((c) => c.type === "income");
  const expenseCategories = categoryBreakdown.filter(
    (c) => c.type === "expense"
  );

  return {
    incomeCategories,
    expenseCategories,
  };
};
