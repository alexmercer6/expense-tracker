import { UniqueItem } from '../entities/UniqueItem.entity';
import { getRepository } from './utils/getRepository';

export const saveUniqueItemRepository = async (
  item: string
): Promise<UniqueItem[]> => {
  const uniqueItemRepository = getRepository(UniqueItem);

  // Check if the item already exists
  let existingItem = await uniqueItemRepository.findOne({ where: { item } });

  // If the item doesn't exist, add it to the table
  if (!existingItem) {
    existingItem = uniqueItemRepository.create({ item });
    await uniqueItemRepository.save(existingItem);
  }

  return findAllUniqueItemsRepository();
};

export const findAllUniqueItemsRepository = () => {
  const uniqueItemRepository = getRepository(UniqueItem);

  return uniqueItemRepository.find();
};
