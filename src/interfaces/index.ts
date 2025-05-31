import { Category, Account } from "@/src/db/schema";

export interface HistoryRecord {
  id: number;
  title: string;
  amount: number;
  type: "expense" | "income";
  category: Category;
  account: Account;
  date: Date | string;
  accountId?: number;
  categoryId?: number;
  fromAccount?: Account;
  toAccount?: Account;
}
