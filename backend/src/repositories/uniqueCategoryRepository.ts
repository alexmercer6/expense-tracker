import { UniqueCategory } from '../entities/UniqueCategory.entity';
import { getRepository } from './utils/getRepository';

export const saveUniqueCategoryRepository = async (
  category: string
): Promise<UniqueCategory[]> => {
  const uniqueCategoryRepository = getRepository(UniqueCategory);

  // Check if the category already exists
  let existingCategory = await uniqueCategoryRepository.findOne({
    where: { category },
  });

  // If the category doesn't exist, add it to the table
  if (!existingCategory) {
    existingCategory = uniqueCategoryRepository.create({ category });
    await uniqueCategoryRepository.save(existingCategory);
  }

  return findAllUniqueCategoriesRepository();
};

export const findAllUniqueCategoriesRepository = () => {
  const uniqueCategoryRepository = getRepository(UniqueCategory);

  return uniqueCategoryRepository.find();
};
