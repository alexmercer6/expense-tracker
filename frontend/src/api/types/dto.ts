import { ExpenseItem } from '../../types/type';

// export interface ExpenseItemWithSpend extends ExpenseItem {
//   totalSpend: number;
// }

export type ExpenseItemsWithTotalSpend = {
  expenseItems: ExpenseItem[];
  totalSpend: number;
};
