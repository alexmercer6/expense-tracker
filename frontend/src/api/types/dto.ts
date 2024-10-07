import { ExpenseItem } from '../../types/type';

// export interface ExpenseItemWithSpend extends ExpenseItem {
//   totalSpend: number;
// }

export type ExpenseItemsDTO = {
  expenseItems: ExpenseItem[];
  totalSpend: number;
  uniqueItems: UniqueItem[];
  uniqueCategories: UniqueCategory[];
  uniqueSubCategories: UniqueCategory[];
};

export type UniqueItem = {
  id: string;
  item: string;
};

export type UniqueCategory = {
  id: string;
  category: string;
};
