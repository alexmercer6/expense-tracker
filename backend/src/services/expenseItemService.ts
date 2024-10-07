// src/services/expenseItemService.ts
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';
import { ExpenseItem } from '../entities/ExpenseItem.entity';
import {
  findAllExpenseItems,
  saveExpenseItem,
  findExpenseItemById,
  updateExpenseItem,
  deleteExpenseItem,
  findExpenseItemsByDateRange,
  saveExpenseItems,
} from '../repositories/expenseItemRepository';
import { ExpenseItemsDTO } from '../dto/Expenses.dto';
import {
  addUniqueItemService,
  getAllUniqueItemsService,
} from './uniqueItemService';
import {
  addUniqueCategoryService,
  getAllUniqueCategoriesService,
} from './uniqueCategoryService';
import { UniqueItem } from '../entities/UniqueItem.entity';
import { UniqueCategory } from '../entities/UniqueCategory.entity';
import {
  addUniqueSubCategoryService,
  getAllUniqueSubCategoriesService,
} from './uniqueSubCategoryService';
import { UniqueSubCategory } from '../entities/UniqueSubCategory.entity';

export function getDateRange(timePeriod?: string, referenceDate?: string) {
  const reference = new Date(referenceDate);

  let startDate: Date;
  let endDate: Date;

  switch (timePeriod) {
    case 'day':
      startDate = startOfDay(reference);
      endDate = endOfDay(reference);
      break;
    case 'week':
      startDate = startOfWeek(reference);
      endDate = endOfWeek(reference);
      break;
    case 'month':
      startDate = startOfMonth(reference);
      endDate = endOfMonth(reference);
      break;
    case 'year':
      startDate = startOfYear(reference);
      endDate = endOfYear(reference);
      break;
    default:
      return null; // Return all items if no time period is specified
  }
  return { startDate, endDate };
}

export const toExpenseItemsDto = (
  items: ExpenseItem[],
  uniqueItems: UniqueItem[],
  uniqueCategories: UniqueCategory[],
  uniqueSubCategories: UniqueSubCategory[]
): ExpenseItemsDTO => {
  const totalSpend = items.reduce((sum, item) => sum + item.cost, 0);
  return {
    expenseItems: items,
    totalSpend,
    uniqueCategories,
    uniqueItems,
    uniqueSubCategories,
  };
};
export async function getExpenseItemsService(
  timePeriod?: string,
  referenceDate?: string
): Promise<ExpenseItemsDTO> {
  const dates = getDateRange(timePeriod, referenceDate);
  const uniqueItems = await getAllUniqueItemsService();
  const uniqueCategories = await getAllUniqueCategoriesService();
  const uniqueSubCategories = await getAllUniqueSubCategoriesService();

  if (!dates) {
    const items = await findAllExpenseItems();
    console.log(items);
    return toExpenseItemsDto(
      items,
      uniqueItems,
      uniqueCategories,
      uniqueSubCategories
    );
  } // Return all items if no time period is specified

  const items = await findExpenseItemsByDateRange(
    dates.startDate,
    dates.endDate
  ); // Query by date range

  return toExpenseItemsDto(
    items,
    uniqueItems,
    uniqueCategories,
    uniqueSubCategories
  );
}

export async function getExpenseItemById(id: number): Promise<ExpenseItem> {
  return findExpenseItemById(id);
}

export async function createExpenseItem(
  expenseItemData: ExpenseItem
): Promise<ExpenseItemsDTO> {
  const newExpenseItem = new ExpenseItem();
  newExpenseItem.item = expenseItemData.item;
  newExpenseItem.cost = expenseItemData.cost;
  newExpenseItem.category = expenseItemData.category;
  newExpenseItem.subCategory = expenseItemData.subCategory;
  newExpenseItem.isNecessary = expenseItemData.isNecessary;
  newExpenseItem.isExpected = expenseItemData.isExpected;
  newExpenseItem.date = expenseItemData.date;

  await addUniqueItemService(expenseItemData.item);
  await addUniqueCategoryService(expenseItemData.category);
  await addUniqueSubCategoryService(expenseItemData.subCategory);

  await saveExpenseItem(newExpenseItem);
  return getExpenseItemsService();
}

export async function createExpenseItems(
  expenseItemData: ExpenseItem[]
): Promise<ExpenseItemsDTO> {
  let newItems: ExpenseItem[] = [];
  for (let expense of expenseItemData) {
    const newExpenseItem = new ExpenseItem();
    newExpenseItem.item = expense.item;
    newExpenseItem.cost = expense.cost;
    newExpenseItem.category = expense.category;
    newExpenseItem.subCategory = expense.subCategory;
    newExpenseItem.isNecessary = expense.isNecessary;
    newExpenseItem.isExpected = expense.isExpected;
    newExpenseItem.date = expense.date;

    await addUniqueItemService(expense.item);
    await addUniqueCategoryService(expense.category);
    await addUniqueSubCategoryService(expense.subCategory);
    newItems.push(newExpenseItem);
  }
  await saveExpenseItems(newItems);

  return getExpenseItemsService();
}

export async function updateExpenseItemById(
  id: number,
  expenseItemData: Partial<ExpenseItem>
): Promise<ExpenseItem[] | null> {
  return updateExpenseItem(id, expenseItemData);
}

export async function deleteExpenseItemById(
  id: number
): Promise<ExpenseItemsDTO> {
  await deleteExpenseItem(id);
  return getExpenseItemsService();
}
