// src/hooks/useGetExpenseItem.ts
import { useQuery } from '@tanstack/react-query';
import apiClient from '../axios';
import { ExpenseItem } from '../../types/type';

export const useGetExpenseItemByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['get-expense', id],
    queryFn: async () => {
      const response = await apiClient.get(`/get-expense/${id}`);
      return response.data as ExpenseItem;
    },
  });
};
