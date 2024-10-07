import Papa from 'papaparse';

export const handleFileUpload = (file: File) => {
  Papa.parse(file, {
    header: true,
    complete: (result) => {
      console.log(result.data); // CSV data is now in JSON format
      // Send the parsed data to your backend or process it here
    },
    error: (error) => {
      console.error('Error parsing CSV:', error);
    },
  });
};
