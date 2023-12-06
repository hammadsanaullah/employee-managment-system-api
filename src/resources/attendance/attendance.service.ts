import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ResponseDto } from '../../shared/common/response.dto';
import { QueryRunnerService } from '../../shared/services/query-runner/query-runner.service';
import { Attendance } from './entities/attendance.entity';
import { COMMON_MESSAGE } from '../../utils/constants';
import { User } from '../user/entities/user.entity';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly queryRunner: QueryRunnerService) {}
  logger = new Logger(AttendanceService.name);

  async create(createAttendanceDto: CreateAttendanceDto): Promise<ResponseDto> {
    const { barCode, siteId, shiftTime } = createAttendanceDto;
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const attendanceRepo = queryRunner.manager.getRepository(Attendance);
      const userRepo = queryRunner.manager.getRepository(User);

      // const exists = await attendanceRepo.findOne({
      //   where: { siteId, shiftEnd: false, userId, deletedAt: null },
      // });
      const user = await userRepo.findOne({
        where: { deletedAt: null, barCode },
      });
      if (user && user.checkedIn === true) {
        throw new ConflictException(
          'Shift is already in progress, end first one then start second',
        );
      }
      const savedAttendance = await attendanceRepo.save({
        userId: user.id,
        siteId,
        shiftTime,
      });

      const attendance = await attendanceRepo
        .createQueryBuilder('attendance')
        .where('attendance.deletedAt IS NULL AND attendance.id = :id', {
          id: savedAttendance.id,
        })
        .leftJoinAndSelect('attendance.user', 'user')
        .getOne();

      await userRepo.update({ id: user.id }, { checkedIn: true });

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_CREATED(Attendance.name),
        data: attendance,
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async checkOut(
    barCode: string,
    checkoutDto: CheckoutDto,
  ): Promise<ResponseDto> {
    const { hours } = checkoutDto;
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const attendanceRepo = queryRunner.manager.getRepository(Attendance);
      const userRepo = queryRunner.manager.getRepository(User);

      const user = await userRepo.findOne({
        where: { barCode, deletedAt: null },
      });

      const exists = await attendanceRepo.findOne({
        where: { shiftEnd: false, userId: user.id, deletedAt: null },
      });
      if (exists) {
        await attendanceRepo.update(
          { id: exists.id },
          { shiftEnd: true, totalHours: hours },
        );
        await userRepo.update({ id: user.id }, { checkedIn: false });
      } else {
        throw new ConflictException('EMPLOYEE ALREADY CHECKEDOUT');
      }

      await queryRunner.commitTransaction();

      return {
        message: 'SUCCESSFULLY CHECKEDOUT EMPLOYEE',
        data: 'SUCCESSFULLY CHECKEDOUT EMPLOYEE',
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
      const userRepo = this.queryRunner.manager.getRepository(User);
      const users = await userRepo.find({
        where: { deletedAt: null, checkedIn: false },
        order: { id: 'DESC' },
      });
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(User.name),
        data: users,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
