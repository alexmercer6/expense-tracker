// src/hooks/useGetExpenseItems.ts
import { useQuery } from '@tanstack/react-query';
import { useExpenseApi } from '../routes/useDeleteExpenseApi';

export const useGetAllExpenseItemsQuery = (
  timePeriod?: string,
  referenceDate?: string
) => {
  const { getExpenseItems } = useExpenseApi();
  return useQuery({
    queryKey: ['get-expenses'],
    queryFn: async () => {
      const t = await getExpenseItems(timePeriod, referenceDate);
      console.log('TTT', t);
      return t;
    },
    enabled: false,
  });
};
