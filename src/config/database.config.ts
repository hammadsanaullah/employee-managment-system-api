import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeORMEntities, dbConfig } from '../utils/constants';
import { config } from 'dotenv';
config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  ...dbConfig,
  autoLoadEntities: true,
  entities: TypeORMEntities,
  synchronize: Boolean(process.env.TYPEORM_SYNC_STATUS),
};
