import { ExpenseItem } from '../entities/ExpenseItem.entity';

export type ExpenseItemsWithTotalSpend = {
  expenseItems: ExpenseItem[];
  totalSpend: number;
};
