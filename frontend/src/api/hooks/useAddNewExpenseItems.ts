// src/hooks/useAddExpenseItem.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../axios';
import { ExpenseItem } from '../../types/type';
import { useNavigate } from 'react-router-dom';

export const useAddExpenseItems = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (newExpenseItems: ExpenseItem[]) => {
      const response = await apiClient.post('/add-expenses', newExpenseItems);
      return response.data.expenseItems as ExpenseItem[];
    },
    onSuccess: (data: ExpenseItem[]) => {
      console.log(data);
      queryClient.setQueryData(['get-expenses'], data);
      navigate('/expenses/table');
    },
  });
};
