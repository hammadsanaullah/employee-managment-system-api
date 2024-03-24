import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { QueryRunnerService } from '../../shared/services/query-runner/query-runner.service';
import { ResponseDto } from '../../shared/common/response.dto';
import { Attendance } from '../attendance/entities/attendance.entity';
import { COMMON_MESSAGE, TypeOptions } from '../../utils/constants';
import { Between } from 'typeorm';
import { TimesheetDto } from './dto/timesheet.dto';
import { User } from '../user/entities/user.entity';
import { Rate } from '../rate/entities/rate.entity';
import { Site } from '../site/entities/site.entity';
import { TimesheetSiteDto } from './dto/timesheet-site.dto';
import { Timesheet } from './entities/timesheet.entity';

@Injectable()
export class TimesheetService {
  constructor(private readonly queryRunner: QueryRunnerService) {}
  logger = new Logger(TimesheetService.name);

  async timesheetByEmployee(timesheetDto: TimesheetDto): Promise<ResponseDto> {
    let { userId, siteId, year, month, week, day } = timesheetDto;
    try {
      const attendanceRepo = this.queryRunner.manager.getRepository(Attendance);
      const userRepo = this.queryRunner.manager.getRepository(User);
      // const rateRepo = this.queryRunner.manager.getRepository(Rate);
      const siteRepo = this.queryRunner.manager.getRepository(Site);

      let startDate: Date;
      let endDate: Date;
      let days: number;

      if (month && !week && !day) {
        // If only month is provided, get all days of the month
        startDate = new Date(year, month - 1, 1);
        endDate = new Date(year, month, 0);
        days = endDate.getDate();
      } else if (month && week) {
        // Calculate the start date of the month
        startDate = new Date(year, month, 1);
        // Find the first day of the week in the specified month
        startDate.setDate(
          startDate.getDate() + (week - 1) * 7 - startDate.getDay(),
        );

        // Calculate the end date of the week
        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + 6,
        );
        days = 7;
      } else if (month && day) {
        startDate = new Date(year, month - 1, day);

        endDate = new Date(startDate);

        // Set the time for endDate to 11:59:59 PM
        endDate.setHours(23, 59, 59, 999); // Hours, Minutes, Seconds, Milliseconds

        days = 1;
      } else {
        throw new BadRequestException(
          'Please provide month, and optionally, either week or day parameter.',
        );
      }

      let currentSite: Site;
      if (siteId) {
        currentSite = await siteRepo
          .createQueryBuilder('site')
          .withDeleted()
          .where({ id: siteId })
          .getOne();
      }

      const timesheetData = await attendanceRepo
        .createQueryBuilder('attendance')
        .withDeleted()
        .where({
          userId,
          createdAt: Between(startDate, endDate),
          siteId: currentSite.id,
        })
        .leftJoinAndSelect('attendance.site', 'site')
        .getMany();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Timesheet.name),
        data: timesheetData,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async timesheetBySite(timesheetDto: TimesheetSiteDto): Promise<ResponseDto> {
    let { siteId, type, year, month, week, day } = timesheetDto;
    try {
      const attendanceRepo = this.queryRunner.manager.getRepository(Attendance);
      const userRepo = this.queryRunner.manager.getRepository(User);
      // const rateRepo = this.queryRunner.manager.getRepository(Rate);
      const siteRepo = this.queryRunner.manager.getRepository(Site);

      let startDate: Date;
      let endDate: Date;
      let days: number;

      if (month && !week && !day) {
        // If only month is provided, get all days of the month
        startDate = new Date(year, month - 1, 1);
        endDate = new Date(year, month, 0);
        days = endDate.getDate();
      } else if (month && week) {
        // Calculate the start date of the month
        startDate = new Date(year, month, 1);
        // Find the first day of the week in the specified month
        startDate.setDate(
          startDate.getDate() + (week - 1) * 7 - startDate.getDay(),
        );

        // Calculate the end date of the week
        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + 6,
        );
        days = 7;
      } else if (month && day) {
        startDate = new Date(year, month - 1, day);

        endDate = new Date(startDate);

        endDate.setHours(23, 59, 59, 999); // Hours, Minutes, Seconds, Milliseconds

        days = 1;
      } else {
        throw new BadRequestException(
          'Please provide month, and optionally, either week or day parameter.',
        );
      }

      let timesheet;

      if (type == TypeOptions.EMPLOYEE) {
        //Get all employees of current siteId

        timesheet = await attendanceRepo
          .createQueryBuilder('attendance')
          .withDeleted()
          .where({
            createdAt: Between(startDate, endDate),
            siteId,
          })
          .leftJoinAndSelect('attendance.site', 'site')
          .leftJoinAndSelect('attendance.user', 'user')
          .getMany();
      } else if (type == TypeOptions.POSITION) {
        const attendanceData = await attendanceRepo
          .createQueryBuilder('attendance')
          .withDeleted()
          .where({
            createdAt: Between(startDate, endDate),
            siteId,
          })
          .getMany();

        const roleHoursMap = new Map();
        const roleRateMap = new Map();
        const roleAmountMap = new Map();

        attendanceData.forEach((attendance) => {
          const { role, totalHours, rate } = attendance;

          // Check if the role exists in the map, if not, initialize it with 0 hours
          if (!roleHoursMap.has(role)) {
            roleHoursMap.set(role, 0);
            roleRateMap.set(role, 0);
            roleAmountMap.set(role, 0);
          }

          // Accumulate the hours for the role
          roleHoursMap.set(role, roleHoursMap.get(role) + totalHours);
          roleRateMap.set(role, roleRateMap.get(role) + rate);
          const totalAmount = totalHours * rate;
          roleAmountMap.set(role, roleAmountMap.get(role) + totalAmount);
        });

        console.log('roleHoursMap: ', roleHoursMap);
        console.log('roleRateMap: ', roleRateMap);
        console.log('roleAmountMap', roleAmountMap);

        const totalHours = Object.fromEntries(roleHoursMap);
        const totalRate = Object.fromEntries(roleRateMap);
        const totalAmount = Object.fromEntries(roleAmountMap);

        timesheet = {
          totalHours,
          totalRate,
          totalAmount,
        };
      }

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(Timesheet.name),
        data: timesheet,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
