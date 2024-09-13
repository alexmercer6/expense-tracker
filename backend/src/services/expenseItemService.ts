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
} from '../repositories/expenseItemRepository';
import { ExpenseItemsWithTotalSpend } from '../dto/Expenses.dto';

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

export const toExpenseItemWithTotalSpendDto = (
  items: ExpenseItem[]
): ExpenseItemsWithTotalSpend => {
  const totalSpend = items.reduce((sum, item) => sum + item.cost, 0);
  return { expenseItems: items, totalSpend };
};
export async function getExpenseItemsService(
  timePeriod?: string,
  referenceDate?: string
): Promise<ExpenseItemsWithTotalSpend> {
  const dates = getDateRange(timePeriod, referenceDate);

  if (!dates) {
    const items = await findAllExpenseItems();
    return toExpenseItemWithTotalSpendDto(items);
  } // Return all items if no time period is specified

  const items = await findExpenseItemsByDateRange(
    dates.startDate,
    dates.endDate
  ); // Query by date range

  return toExpenseItemWithTotalSpendDto(items);
}

export async function getExpenseItemById(id: number): Promise<ExpenseItem> {
  return findExpenseItemById(id);
}

export async function createExpenseItem(
  expenseItemData: ExpenseItem
): Promise<ExpenseItemsWithTotalSpend> {
  const newExpenseItem = new ExpenseItem();
  newExpenseItem.item = expenseItemData.item;
  newExpenseItem.cost = expenseItemData.cost;
  newExpenseItem.category = expenseItemData.category;
  newExpenseItem.isNecessary = expenseItemData.isNecessary;
  newExpenseItem.isExpected = expenseItemData.isExpected;
  newExpenseItem.date = expenseItemData.date;

  await saveExpenseItem(newExpenseItem);
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
): Promise<ExpenseItemsWithTotalSpend> {
  await deleteExpenseItem(id);
  return getExpenseItemsService();
}
