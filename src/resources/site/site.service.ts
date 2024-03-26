import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { ResponseDto } from '../../shared/common/response.dto';
import { QueryRunnerService } from '../../shared/services/query-runner/query-runner.service';
import { Site } from './entities/site.entity';
import { COMMON_MESSAGE, ERROR_MESSAGE } from '../../utils/constants';

@Injectable()
export class SiteService {
  constructor(private readonly queryRunner: QueryRunnerService) {}
  logger = new Logger(SiteService.name);

  async create(createSiteDto: CreateSiteDto): Promise<ResponseDto> {
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const siteRepo = queryRunner.manager.getRepository(Site);

      const site = await siteRepo.save({ ...createSiteDto });

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_CREATED(Site.name),
        data: site,
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (
        error?.code == '23505' &&
        error?.detail ===
          `Key (site)=(${createSiteDto.companyName}) already exists.`
      ) {
        throw new ConflictException(
          ERROR_MESSAGE.ALREADY_EXIST(createSiteDto.site),
        );
      }
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const siteRepo = this.queryRunner.manager.getRepository(Site);
      const sites = await siteRepo.find({ where: { deletedAt: null } });
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Site.name),
        data: sites,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const siteRepo = this.queryRunner.manager.getRepository(Site);
      const site = await siteRepo.findOne({ where: { id, deletedAt: null } });
      if (!site) {
        throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND(Site.name));
      }
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Site.name),
        data: site,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  // update(id: number, updateSiteDto: UpdateSiteDto) {
  //   return `This action updates a #${id} site`;
  // }

  async remove(id: number) {
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const siteRepo = queryRunner.manager.getRepository(Site);

      await siteRepo.delete(id);

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_DELETED(Site.name),
        data: COMMON_MESSAGE.SUCCESSFULLY_DELETED(Site.name),
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
