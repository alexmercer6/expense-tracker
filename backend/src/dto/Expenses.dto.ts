import { ExpenseItem } from '../entities/ExpenseItem.entity';
import { UniqueCategory } from '../entities/UniqueCategory.entity';
import { UniqueItem } from '../entities/UniqueItem.entity';
import { UniqueSubCategory } from '../entities/UniqueSubCategory.entity';

export type ExpenseItemsDTO = {
  expenseItems: ExpenseItem[];
  totalSpend: number;
  uniqueItems: UniqueItem[];
  uniqueCategories: UniqueCategory[];
  uniqueSubCategories: UniqueSubCategory[];
};
