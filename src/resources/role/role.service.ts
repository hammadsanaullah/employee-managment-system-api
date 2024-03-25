import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseDto } from '../../shared/common/response.dto';
import { QueryRunnerService } from '../../shared/services/query-runner/query-runner.service';
import { Role } from './entities/role.entity';
import { COMMON_MESSAGE, ERROR_MESSAGE } from '../../utils/constants';

@Injectable()
export class RoleService {
  constructor(private readonly queryRunner: QueryRunnerService) {}
  logger = new Logger(RoleService.name);

  async create(createRoleDto: CreateRoleDto): Promise<ResponseDto> {
    const { title, description } = createRoleDto;
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const roleRepo = queryRunner.manager.getRepository(Role);
      const exists = await roleRepo.findOne({
        where: {
          title,
          deletedAt: null,
        },
      });
      if (exists) {
        throw new ConflictException(ERROR_MESSAGE.ALREADY_EXIST(Role.name));
      }
      const rate = await roleRepo.save({ title, description });

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_CREATED(Role.name),
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
      const roleRepo = this.queryRunner.manager.getRepository(Role);
      const roles = await roleRepo
        .createQueryBuilder('rate')
        .where('rate.deletedAt IS NULL')
        .getMany();
      // const rates = await rateRepo.find({ where: { deletedAt: null } });
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Role.name),
        data: roles,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const roleRepo = queryRunner.manager.getRepository(Role);

      await roleRepo.delete(id);

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_DELETED(Role.name),
        data: COMMON_MESSAGE.SUCCESSFULLY_DELETED(Role.name),
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
