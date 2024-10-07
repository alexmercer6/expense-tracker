import { UniqueSubCategory } from '../entities/UniqueSubCategory.entity';
import { getRepository } from './utils/getRepository';

export const saveUniqueSubCategoryRepository = async (
  category: string
): Promise<UniqueSubCategory[]> => {
  const uniqueSubCategoryRepository = getRepository(UniqueSubCategory);

  // Check if the category already exists
  let existingCategory = await uniqueSubCategoryRepository.findOne({
    where: { category },
  });

  // If the category doesn't exist, add it to the table
  if (!existingCategory) {
    existingCategory = uniqueSubCategoryRepository.create({ category });
    await uniqueSubCategoryRepository.save(existingCategory);
  }

  return findAllUniqueSubCategoriesRepository();
};

export const findAllUniqueSubCategoriesRepository = () => {
  const uniqueSubCategoryRepository = getRepository(UniqueSubCategory);

  return uniqueSubCategoryRepository.find();
};
