import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
const init = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
};
export const getRepository = <T extends ObjectLiteral>(
  entity: EntityTarget<T>
): Repository<T> => {
  // Check if the data source is initialized, if not, initialize it
  init();
  return AppDataSource.getRepository(entity);
};
