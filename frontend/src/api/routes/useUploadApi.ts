import apiClient from '../axios';

export const useUploadApi = () => {
  return {
    uploadCsv: async (csv: File): Promise<void> => {
      const response = await apiClient.post(`/parse-csv`, csv);
      return response.data;
    },
  };
};
