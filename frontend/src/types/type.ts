export type ExpenseItem = {
  id: number; // Unique identifier for the expense item
  item: string; // The name of the item
  cost: number; // The cost of the item (decimal value)
  category: string;
  subCategory?: string;
  isNecessary: boolean; // Flag indicating if the item is necessary
  isExpected: boolean; // Flag indicating if the item was expected
  date: string; // UTC timestamp for when the expense occurred
};
