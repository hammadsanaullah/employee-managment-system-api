import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QueryRunnerService } from '../query-runner/query-runner.service';
import { Attendance } from '../../../resources/attendance/entities/attendance.entity';
import { User } from '../../../resources/user/entities/user.entity';

@Injectable()
export class ScheduledJobsService {
  constructor(private readonly queryRunner: QueryRunnerService) {}

  logger = new Logger(ScheduledJobsService.name);

  @Cron(CronExpression.EVERY_SECOND)
  async updateAttendances() {
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const attendanceRepo = this.queryRunner.manager.getRepository(Attendance);
      const userRepo = this.queryRunner.manager.getRepository(User);
      const activeSessions = await attendanceRepo
        .createQueryBuilder('attendance')
        .where('attendance.shiftEnd = :status', { status: false })
        .leftJoinAndSelect('attendance.site', 'site')
        .getMany();
      //get attendance, check shiftTime, add shiftHours to shiftTime and compare with currentTime, if yes then update shiftEnds: true else do nothing
      for (const session of activeSessions) {
        const currentTime = new Date();
        const shiftTimeParts = session.shiftTime.split(':');

        const createdAtDate = new Date(session.createdAt);
        const year = createdAtDate.getUTCFullYear();
        const month = createdAtDate.getUTCMonth();
        const day = createdAtDate.getUTCDate();

        const shiftStartTime = new Date(
          Date.UTC(
            year,
            month,
            day,
            parseInt(shiftTimeParts[0], 10),
            parseInt(shiftTimeParts[1], 10),
            0,
            0,
          ),
        );

        const shiftEndTime = new Date(
          shiftStartTime.getTime() + session.site.shiftHours * 60 * 60 * 1000,
        );

        if (currentTime >= shiftEndTime) {
          // Calculate total hours based on shift start and end time
          const timeDifference =
            shiftEndTime.getTime() - shiftStartTime.getTime();
          const totalHours = timeDifference / (60 * 60 * 1000);
          session.totalHours = totalHours;
          await attendanceRepo.update(
            { id: session.id },
            { totalHours, shiftEnd: true },
          );
          await userRepo.update({ id: session.userId }, { checkedIn: false });
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
