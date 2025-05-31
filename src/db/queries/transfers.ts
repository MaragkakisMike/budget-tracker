import { asc, desc, eq } from "drizzle-orm";
import { transfers, categories, accounts } from "@/src/db/schema";

export const getTransfers = (drizzleDb) => {
  return drizzleDb.select().from(transfers).orderBy(desc(transfers.date));
};
