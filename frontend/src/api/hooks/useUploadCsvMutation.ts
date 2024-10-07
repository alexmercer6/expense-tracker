import { useMutation } from '@tanstack/react-query';
import { useUploadApi } from '../routes/useUploadApi';

export const useUploadCsv = () => {
  const { uploadCsv } = useUploadApi();
  return useMutation({
    mutationFn: async (csv: File) => {
      await uploadCsv(csv);
    },
  });
};
