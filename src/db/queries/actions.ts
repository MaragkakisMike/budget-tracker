import { sql } from "drizzle-orm";
import { eq, and, gte, lt } from "drizzle-orm";
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

  let transfersQuerry = drizzleDB
    .select({
      totalTransfer: sql<number>`SUM(amount)`.mapWith(Number),
    })
    .from(transfers);

  if (startDate && endDate) {
    query = query.where(
      and(gte(transactions.date, startDate), lt(transactions.date, endDate))
    );
    transfersQuerry = transfersQuerry.where(
      and(gte(transfers.date, startDate), lt(transfers.date, endDate))
    );
  } else if (startDate) {
    query = query.where(gte(transactions.date, startDate));
    transfersQuerry = transfersQuerry.where(gte(transfers.date, startDate));
  } else if (endDate) {
    query = query.where(lt(transactions.date, endDate));
    transfersQuerry = transfersQuerry.where(lt(transfers.date, endDate));
  }

  const result = { ...query.get(), ...transfersQuerry.get() };

  return {
    totalIncome: result.totalIncome || 0,
    totalExpense: result.totalExpense || 0,
    totalTransfer: result.totalTransfer || 0,
  };
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

  const categoryBreakdown = query
    .groupBy(
      transactions.categoryId,
      categories.name,
      transactions.type,
      categories.color,
      categories.icon
    )
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

  // Calculate total amounts for percentage calculation
  const totalIncomeAmount = incomeCategories.reduce(
    (sum, category) => sum + category.totalAmount,
    0
  );
  const totalExpenseAmount = expenseCategories.reduce(
    (sum, category) => sum + category.totalAmount,
    0
  );

  // Add percentage to each category
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
