import { accounts } from "@/src/db/schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import AsyncStorage from "expo-sqlite/kv-store";
import { db } from "@/src/db/client";
export const addDammyData = async () => {
  const value = AsyncStorage.getItemSync("dbInitialized");
  if (value) {
    return;
  }
  await db.insert(accounts).values([
    { name: "Euro", balance: 100 },
    { name: "Dollar", balance: 200 },
  ]);

  AsyncStorage.setItemSync("dbInitialized", "true");
};
