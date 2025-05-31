export interface ExpenseFormData {
  id?: number;
  amount: string;
  title: string;
  categoryId: number | null;
  accountId: number | null;
  date: string | Date;
}

export interface IncomeFormData {
  id?: number;
  amount: string;
  title: string;
  accountId: number | null;
  date: string | Date;
}

export interface TransferFormData {
  id?: number;
  amount: string;
  title: string;
  fromAccountId: number | null;
  toAccountId: number | null;
  date: string | Date;
}
