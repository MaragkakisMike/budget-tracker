import {
  ExpenseFormData,
  IncomeFormData,
  TransferFormData,
} from "@/src/interfaces/actions";

export type ActionFormData = {
  type: ActionType;
} & (ExpenseFormData | IncomeFormData | TransferFormData);

export type ActionType = "expense" | "income" | "transfer";
