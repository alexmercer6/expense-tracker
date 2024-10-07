import {
  findAllUniqueCategoriesRepository,
  saveUniqueCategoryRepository,
} from '../repositories/uniqueCategoryRepository';

export const addUniqueCategoryService = async (category: string) => {
  const uniqueCategory = await saveUniqueCategoryRepository(category);
  return uniqueCategory;
};

export const getAllUniqueCategoriesService = async () =>
  await findAllUniqueCategoriesRepository();
