import {
  findAllUniqueSubCategoriesRepository,
  saveUniqueSubCategoryRepository,
} from '../repositories/uniqueSubCategoryRepository';

export const addUniqueSubCategoryService = async (category: string) => {
  const uniqueSubCategory = await saveUniqueSubCategoryRepository(category);
  return uniqueSubCategory;
};

export const getAllUniqueSubCategoriesService = async () =>
  await findAllUniqueSubCategoriesRepository();
