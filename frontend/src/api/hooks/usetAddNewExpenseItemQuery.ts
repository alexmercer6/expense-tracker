// src/hooks/useAddExpenseItem.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../axios';
import { ExpenseItem } from '../../types/type';

export const useAddExpenseItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newExpenseItem: ExpenseItem) => {
      const response = await apiClient.post('/add-expense', newExpenseItem);
      return response.data.expenseItems as ExpenseItem[];
    },
    onSuccess: (data: ExpenseItem[]) => {
      console.log(data);
      queryClient.setQueryData(['get-expenses'], data);
    },
  });
};
