import apiClient from '../axios';
import { ExpenseItem } from '../../types/type';
import { ExpenseItemsWithTotalSpend } from '../types/dto';

export const useExpenseApi = () => {
  return {
    getExpenseItems: async (
      timePeriod?: string,
      referenceDate?: string
    ): Promise<ExpenseItemsWithTotalSpend> => {
      const response = await apiClient.get(
        `/get-expenses?timePeriod=${timePeriod}&referenceDate=${referenceDate}`
      );
      return response.data;
    },
    getExpenseItem: async (id: string): Promise<ExpenseItemsWithTotalSpend> => {
      const response = await apiClient.post(`/get-expense/${id}`);
      return response.data;
    },
    addExpenseItem: async (
      expenseItem: ExpenseItem
    ): Promise<ExpenseItem[]> => {
      const response = await apiClient.post('/add-expense', expenseItem);
      return response.data;
    },
    updateExpenseItem: async (
      expenseItem: ExpenseItem
    ): Promise<ExpenseItem[]> => {
      const response = await apiClient.post('/update-expense', expenseItem);
      return response.data;
    },
    deleteExpenseItem: async (id: string): Promise<ExpenseItem[]> => {
      const response = await apiClient.post(`/delete-expense/${id}`);
      return response.data;
    },
  };
};
