import {
  findAllUniqueItemsRepository,
  saveUniqueItemRepository,
} from '../repositories/uniqueItemRepository';

export const addUniqueItemService = async (item: string) => {
  const uniqueItem = await saveUniqueItemRepository(item);
  return uniqueItem;
};

export const getAllUniqueItemsService = async () =>
  await findAllUniqueItemsRepository();
