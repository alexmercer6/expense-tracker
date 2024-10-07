// src/services/csvService.ts
import { parse } from 'csv-parse';
import { saveParsedData } from '../repositories/saveAndParseCsvData';

export const parseAndSaveCsv = async (csvData: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    parse(
      csvData,
      {
        columns: true,
        trim: true,
      },
      async (err, records) => {
        if (err) {
          return reject(err);
        }
        try {
          // Save the parsed data using the repository function
          const parsed = records.map((r) => {
            console.log('PARSING', r);
            return {
              ...r,
              ...handleParseCategoryAndItem(r.item, r.Category),
            };
          });
          await saveParsedData(parsed);
          resolve();
        } catch (saveError) {
          reject(saveError);
        }
      }
    );
  });
};

const handleParseCategoryAndItem = (item: string, category: string) => {
  const lowerCaseCategory = category.toLowerCase();
  if (lowerCaseCategory.includes('transfer')) {
    return { category: 'Transfer', item };
  }
  if (
    lowerCaseCategory.includes('coles') ||
    lowerCaseCategory.includes('woolworths')
  ) {
    return { category: 'Food', item: 'Groceries' };
  }
  return { item, category };
};
