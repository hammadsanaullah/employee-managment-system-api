import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
// import { SessionService } from '../../shared/services/session/session.service';
import { QueryRunnerService } from '../../shared/services/query-runner/query-runner.service';
import { Location } from './entities/location.entity';
import { COMMON_MESSAGE, ERROR_MESSAGE } from '../../utils/constants';

@Injectable()
export class LocationService {
  constructor(
    private readonly queryRunner: QueryRunnerService,
  ) {}

  logger = new Logger(LocationService.name);

  async create(createLocationDto: CreateLocationDto) {
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const locationRepo = queryRunner.manager.getRepository(Location);

      const savedLocation = await locationRepo.save({
        ...createLocationDto,
      });
      await queryRunner.commitTransaction();
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_CREATED(Location.name),
        data: savedLocation,
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (
        error?.code == '23505' &&
        error?.detail ===
          `Key (locationTitle)=(${createLocationDto.locationTitle}) already exists.`
      ) {
        throw new ConflictException(
          ERROR_MESSAGE.ALREADY_EXIST(createLocationDto.locationTitle),
        );
      }
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const locationRepo = this.queryRunner.getRepository(Location);
      const data = await locationRepo.find({
        where: { deletedAt: null },
        order: { id: 'ASC' },
      });
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Location.name),
        data,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const locationRepo = this.queryRunner.getRepository(Location);
      const data = await locationRepo.findOne({
        where: { id, deletedAt: null },
      });
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Location.name),
        data,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const locationRepo = queryRunner.manager.getRepository(Location);
      const check = await locationRepo.findOne({
        where: { id, deletedAt: null },
      });
      if (!check) {
        throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND(Location.name));
      }
      await locationRepo.update(
        { id },
        {
          ...updateLocationDto,
        },
      );
      const location = await locationRepo.findOne({
        where: { id },
      });
      await queryRunner.commitTransaction();
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_CREATED(Location.name),
        data: location,
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const locationRepo = queryRunner.manager.getRepository(Location);
      const check = await locationRepo.findOne({
        where: { id, deletedAt: null },
      });
      if (!check) {
        throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND(Location.name));
      }
      await locationRepo.softDelete({
        id,
      });
      await queryRunner.commitTransaction();
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_DELETED(Location.name),
        data: COMMON_MESSAGE.SUCCESSFULLY_DELETED(Location.name),
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
