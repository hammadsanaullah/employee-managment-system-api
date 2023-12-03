import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { ResponseDto } from '../../shared/common/response.dto';
import { QueryRunnerService } from '../../shared/services/query-runner/query-runner.service';
import { Rate } from './entities/rate.entity';
import { COMMON_MESSAGE, ERROR_MESSAGE } from '../../utils/constants';

@Injectable()
export class RateService {
  constructor(private readonly queryRunner: QueryRunnerService) {}
  logger = new Logger(RateService.name);

  async create(createRateDto: CreateRateDto): Promise<ResponseDto> {
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const rateRepo = queryRunner.manager.getRepository(Rate);
      const exists = await rateRepo.findOne({
        where: { siteId: createRateDto.siteId, deletedAt: null },
      });
      if (exists && exists.role === createRateDto.role) {
        throw new ConflictException(ERROR_MESSAGE.ALREADY_EXIST(Rate.name));
      }
      const rate = await rateRepo.save({ ...createRateDto });

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_CREATED(Rate.name),
        data: rate,
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const rateRepo = this.queryRunner.manager.getRepository(Rate);
      const rates = await rateRepo
        .createQueryBuilder('rate')
        .where('rate.deletedAt IS NULL')
        .leftJoinAndSelect('rate.site', 'site')
        .getMany();
      // const rates = await rateRepo.find({ where: { deletedAt: null } });
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Rate.name),
        data: rates,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const rateRepo = this.queryRunner.manager.getRepository(Rate);
      const rate = await rateRepo.findOne({ where: { id, deletedAt: null } });
      if (!rate) {
        throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND(Rate.name));
      }
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Rate.name),
        data: rate,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  // update(id: number, updateRateDto: UpdateRateDto) {
  //   return `This action updates a #${id} rate`;
  // }

  async remove(id: number) {
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const rateRepo = queryRunner.manager.getRepository(Rate);

      await rateRepo.softDelete(id);

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_DELETED(Rate.name),
        data: COMMON_MESSAGE.SUCCESSFULLY_DELETED(Rate.name),
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
