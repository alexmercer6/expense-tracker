// src/hooks/useUpdateExpenseItem.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../axios';
import { ExpenseItem } from '../../types/type';

export const useUpdateExpenseItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updatedExpenseItem,
    }: {
      updatedExpenseItem: ExpenseItem;
    }) => {
      const response = await apiClient.post(
        `/update-expense`,
        updatedExpenseItem
      );
      return response.data as ExpenseItem[];
    },
    onSuccess: (data: ExpenseItem[]) => {
      queryClient.setQueryData(data, { queryKey: ['get-expenses'] });
    },
  });
};
