import { Injectable } from '@nestjs/common';
import { TypeORMEntities, dbConfig } from '../../../utils/constants';
import { DataSource } from 'typeorm';

@Injectable()
export class QueryRunnerService extends DataSource {
  constructor() {
    super({ ...dbConfig, entities: TypeORMEntities });
    this.initialize();
  }
}
