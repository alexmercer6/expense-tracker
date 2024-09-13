// src/hooks/useDeleteExpenseItem.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExpenseItem } from '../../types/type';
import { useExpenseApi } from '../routes/useDeleteExpenseApi';

export const useDeleteExpenseItem = () => {
  const queryClient = useQueryClient();
  const { deleteExpenseItem } = useExpenseApi();

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteExpenseItem(id);
    },
    onSuccess: (data: ExpenseItem[]) => {
      queryClient.setQueryData(data, { queryKey: ['get-expenses'] });
    },
  });
};
