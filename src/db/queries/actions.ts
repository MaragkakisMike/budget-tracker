import { sql } from "drizzle-orm";
import { eq, and, gte, lt, desc } from "drizzle-orm";
import { transactions, categories, transfers } from "@/src/db/schema";

export const getTotalValues = (
  drizzleDB: any,
  startDate?: string,
  endDate?: string
) => {
  let query = drizzleDB
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
    .from(transactions);

  if (startDate && endDate) {
    query = query.where(
      and(gte(transactions.date, startDate), lt(transactions.date, endDate))
    );
  } else if (startDate) {
    query = query.where(gte(transactions.date, startDate));
  } else if (endDate) {
    query = query.where(lt(transactions.date, endDate));
  }

  return query;
};

export const getTransfers = (
  drizzleDB: any,
  startDate?: string,
  endDate?: string
) => {
  let query = drizzleDB
    .select({
      totalTransfer: sql<number>`SUM(amount)`.mapWith(Number),
    })
    .from(transfers);

  if (startDate && endDate) {
    query = query.where(
      and(gte(transfers.date, startDate), lt(transfers.date, endDate))
    );
  } else if (startDate) {
    query = query.where(gte(transfers.date, startDate));
  } else if (endDate) {
    query = query.where(lt(transfers.date, endDate));
  }

  return query;
};

export const getBreakdownByCategory = (
  drizzleDB: any,
  startDate?: string,
  endDate?: string
) => {
  let query = drizzleDB
    .select({
      categoryId: transactions.categoryId,
      categoryName: categories.name,
      totalAmount: sql<number>`SUM(amount)`.mapWith(Number),
      type: transactions.type,
      color: categories.color,
      icon: categories.icon,
    })
    .from(transactions)
    .innerJoin(categories, eq(transactions.categoryId, categories.id));

  if (startDate && endDate) {
    query = query.where(
      and(gte(transactions.date, startDate), lt(transactions.date, endDate))
    );
  } else if (startDate) {
    query = query.where(gte(transactions.date, startDate));
  } else if (endDate) {
    query = query.where(lt(transactions.date, endDate));
  }

  return query.groupBy(
    transactions.categoryId,
    categories.name,
    transactions.type,
    categories.color,
    categories.icon
  );
};

export const getExpensesByCategory = (
  drizzleDB: any,
  categoryId: number,
  startDate?: string,
  endDate?: string
) => {
  let query = drizzleDB
    .select({
      id: transactions.id,
      amount: transactions.amount,
      date: transactions.date,
      type: transactions.type,
      categoryId: transactions.categoryId,
      categoryName: categories.name,
      categoryColor: categories.color,
      categoryIcon: categories.icon,
    })
    .from(transactions)
    .innerJoin(categories, eq(transactions.categoryId, categories.id));

  const conditions = [
    eq(transactions.categoryId, categoryId),
    eq(transactions.type, "expense"),
  ];

  if (startDate && endDate) {
    conditions.push(
      gte(transactions.date, startDate),
      lt(transactions.date, endDate)
    );
  } else if (startDate) {
    conditions.push(gte(transactions.date, startDate));
  } else if (endDate) {
    conditions.push(lt(transactions.date, endDate));
  }

  return query.where(and(...conditions)).orderBy(desc(transactions.date));
};

export const getTransactions = (drizzleDB: any) => {
  return drizzleDB.select().from(transactions).orderBy(desc(transactions.date));
};

export const processCategoryBreakdown = (categoryBreakdown: any[]) => {
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

  const totalIncomeAmount = incomeCategories.reduce(
    (sum, category) => sum + category.totalAmount,
    0
  );
  const totalExpenseAmount = expenseCategories.reduce(
    (sum, category) => sum + category.totalAmount,
    0
  );

  const incomeCategoriesWithPercentage = incomeCategories.map((category) => ({
    ...category,
    percentage:
      totalIncomeAmount > 0
        ? Math.round((category.totalAmount / totalIncomeAmount) * 100)
        : 0,
  }));

  const expenseCategoriesWithPercentage = expenseCategories.map((category) => ({
    ...category,
    percentage:
      totalExpenseAmount > 0
        ? Math.round((category.totalAmount / totalExpenseAmount) * 100)
        : 0,
  }));

  return {
    incomeCategories: incomeCategoriesWithPercentage,
    expenseCategories: expenseCategoriesWithPercentage,
  };
};

export const processExpensesByCategory = (
  expenses: any[],
  categoryId: number
) => {
  if (!expenses || expenses.length === 0) {
    return {
      expenses: [],
      totalAmount: 0,
      categoryId,
      categoryName: null,
      categoryColor: null,
      categoryIcon: null,
      count: 0,
    };
  }

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return {
    expenses,
    totalAmount,
    categoryId,
    categoryName: expenses[0]?.categoryName || null,
    categoryColor: expenses[0]?.categoryColor || null,
    categoryIcon: expenses[0]?.categoryIcon || null,
    count: expenses.length,
  };
};

export const processTotalValues = (totalsData: any[], transfersData: any[]) => {
  const totals = totalsData?.[0] || {};
  const transfers = transfersData?.[0] || {};

  return {
    totalIncome: totals.totalIncome || 0,
    totalExpense: totals.totalExpense || 0,
    totalTransfer: transfers.totalTransfer || 0,
  };
};
