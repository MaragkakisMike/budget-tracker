import { asc } from "drizzle-orm";
import { categories } from "@/src/db/schema";
import { eq } from "drizzle-orm";
export const getCategories = (drizzleDb) => {
  return drizzleDb.select().from(categories).orderBy(asc(categories.id));
};

export const getCategoryById = (drizzleDb, id) => {
  return drizzleDb
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);
};
