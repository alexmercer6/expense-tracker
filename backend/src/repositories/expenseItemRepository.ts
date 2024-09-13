// src/repositories/expenseItemRepository.ts;
import { startOfDay, startOfWeek, startOfMonth, startOfYear } from 'date-fns';
import { Between, MoreThanOrEqual } from 'typeorm';
import { ExpenseItem } from '../entities/ExpenseItem.entity';
import { getRepository } from './utils/getRepository';

const expenseItemRepository = getRepository(ExpenseItem);

export async function findExpenseItemsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<ExpenseItem[]> {
  const expenseItemRepository = getRepository(ExpenseItem);
  return expenseItemRepository.find({
    where: {
      date: Between(startDate.toISOString(), endDate.toISOString()), // Dates stored as strings
    },
  });
}

export async function findAllExpenseItems(): Promise<ExpenseItem[]> {
  const expenseItemRepository = getRepository(ExpenseItem);
  return expenseItemRepository.find(); // Fetch all items if no date range is needed
}

export async function findExpenseItemById(
  id: number
): Promise<ExpenseItem | null> {
  return expenseItemRepository.findOneBy({ id });
}

export async function saveExpenseItem(
  expenseItem: ExpenseItem
): Promise<ExpenseItem> {
  return await expenseItemRepository.save(expenseItem);
}

export async function updateExpenseItem(
  id: number,
  expenseItemData: Partial<ExpenseItem>
): Promise<ExpenseItem[] | null> {
  const expenseItem = await findExpenseItemById(id);
  if (!expenseItem) return null;

  Object.assign(expenseItem, expenseItemData);
  await expenseItemRepository.save(expenseItem);
  return findAllExpenseItems();
}

export async function deleteExpenseItem(id: number): Promise<boolean> {
  const result = await expenseItemRepository.delete(id);
  return result.affected !== 0;
}
