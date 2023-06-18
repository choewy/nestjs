import { FactoryProvider, Type } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const CustomRepositoryProvider = <T>(Repository: Type<T>): FactoryProvider<T> => ({
  inject: [DataSource],
  provide: Repository,
  useFactory(dataSource: DataSource) {
    const entity = Reflect.getMetadata(Repository.name, Repository);
    const entityManager = dataSource.createEntityManager();

    return new Repository(entity, entityManager);
  },
});
