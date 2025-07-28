import { asc, desc, eq } from "drizzle-orm";
import { transactions, categories, accounts } from "@/src/db/schema";

export const getTransactions = (drizzleDb) => {
  return drizzleDb.select().from(transactions).orderBy(desc(transactions.date));
};

export const getAllTransactionYears = (drizzleDB: any) => {
  return drizzleDB
    .select({
      date: transactions.date,
    })
    .from(transactions)
    .orderBy(desc(transactions.date));
};
