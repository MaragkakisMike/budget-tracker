import { asc } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { accounts } from "@/src/db/schema";

export const getAccounts = (drizzleDb) => {
  return drizzleDb.select().from(accounts).orderBy(asc(accounts.id));
};

export const getAccountById = (drizzleDb, id) => {
  return drizzleDb.select().from(accounts).where(eq(accounts.id, id)).limit(1);
};
