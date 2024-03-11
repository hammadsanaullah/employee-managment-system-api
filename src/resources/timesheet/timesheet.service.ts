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
    let { userId, siteIds, year, month, week, day } = timesheetDto;
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

      const user = await userRepo.findOne({ where: { id: userId } });
      // const rates = await rateRepo.createQueryBuilder('rate').where('rate.siteId = IN (:...siteIds)', {siteIds}).getMany();
      // const sites = await siteRepo
      //   .createQueryBuilder('site')
      //   .where('site.id = IN (:...siteIds)', { siteIds })
      //   .leftJoinAndSelect('site.rate', 'rate')
      //   .andWhere('rate.role = :role', { role: user.role })
      //   .getMany();

      let timesheet: any[] = [];
      if (!siteIds) {
        siteIds = (
          await siteRepo
            .createQueryBuilder('site')
            .withDeleted()
            .select(['site.id'])
            .getMany()
        ).map((site) => site.id);
      }

      for (const currentSiteId of siteIds) {
        const timesheetData = await attendanceRepo
          .createQueryBuilder('attendance')
          .withDeleted()
          .where({
            userId,
            createdAt: Between(startDate, endDate),
            siteId: currentSiteId,
          })
          .leftJoinAndSelect('attendance.site', 'site')
          .leftJoinAndSelect('site.rate', 'rate')
          .andWhere('rate.role = :role', { role: user.role })
          .leftJoinAndSelect('attendance.user', 'user')
          .getMany();

        let site = await siteRepo
          .createQueryBuilder('site')
          .withDeleted()
          .where({
            id: currentSiteId,
          })
          .leftJoinAndSelect('site.rate', 'rate')
          .andWhere('rate.role = :role', { role: user.role })
          .getOne();

        let hourlyRate: number = 0;
        let totalHours: number = 0;
        let hoursCompleted: number = 0;
        let totalAmount: number = 0;
        let currentSiteTimesheet: any;
        // let site: any;

        if (site) {
          hourlyRate = site.rate[0].rate;
        }

        if (timesheetData.length !== 0) {
          for (const attendance of timesheetData) {
            hoursCompleted += attendance.totalHours;
            totalHours = attendance.site.shiftHours * days;
          }
        }

        site = await siteRepo
          .createQueryBuilder('site')
          .withDeleted()
          .where({
            id: currentSiteId,
          })
          .getOne();

        totalAmount = hourlyRate * hoursCompleted;
        currentSiteTimesheet = {
          siteId: currentSiteId,
          site,
          hourlyRate,
          hoursCompleted,
          totalHours,
          totalAmount,
        };

        // Add the current site's timesheet to the overall timesheet array
        timesheet.push(currentSiteTimesheet);
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

  async timesheetBySite(timesheetDto: TimesheetSiteDto): Promise<ResponseDto> {
    let { userIds, siteId, roles, type, year, month, week, day } = timesheetDto;
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

      // const user = await userRepo.findOne({ where: { id: userId } });
      // const rates = await rateRepo.createQueryBuilder('rate').where('rate.siteId = IN (:...siteIds)', {siteIds}).getMany();
      // const sites = await siteRepo
      //   .createQueryBuilder('site')
      //   .where('site.id = IN (:...siteIds)', { siteIds })
      //   .leftJoinAndSelect('site.rate', 'rate')
      //   .andWhere('rate.role = :role', { role: user.role })
      //   .getMany();

      let timesheet: any[] = [];

      if (type == TypeOptions.EMPLOYEE) {
        if (!userIds) {
          userIds = (
            await userRepo.find({
              where: { deletedAt: null },
              select: { id: true },
            })
          ).map((site) => site.id);
        }

        for (const currentUserId of userIds) {
          const user = await userRepo.findOne({ where: { id: currentUserId } });
          const timesheetData = await attendanceRepo
            .createQueryBuilder('attendance')
            .withDeleted()
            .where({
              userId: currentUserId,
              createdAt: Between(startDate, endDate),
              siteId,
            })
            .leftJoinAndSelect('attendance.site', 'site')
            .leftJoinAndSelect('site.rate', 'rate')
            .andWhere('rate.role = :role', { role: user?.role })
            .leftJoinAndSelect('attendance.user', 'user')
            .getMany();

          const site = await siteRepo
            .createQueryBuilder('site')
            .withDeleted()
            .where({
              id: siteId,
            })
            .leftJoinAndSelect('site.rate', 'rate')
            .andWhere('rate.role = :role', { role: user.role })
            .getOne();

          let hourlyRate: number = 0;
          let totalHours: number = 0;
          let hoursCompleted: number = 0;
          let totalAmount: number = 0;
          let currentSiteTimesheet: any;

          if (site) {
            hourlyRate = site.rate[0].rate;
          }

          if (timesheetData.length !== 0) {
            for (const attendance of timesheetData) {
              hoursCompleted += attendance.totalHours;
              totalHours = attendance.site.shiftHours * days;
            }
          }

          totalAmount = hourlyRate * hoursCompleted;
          currentSiteTimesheet = {
            userId: currentUserId,
            site,
            hourlyRate,
            hoursCompleted,
            totalHours,
            totalAmount,
          };

          timesheet.push(currentSiteTimesheet);
        }
      } else if (type == TypeOptions.POSITION) {
        if (roles && !Array.isArray(roles)) {
          roles = [roles];
        }
        // if(!roles) {
        //   roles = (await userRepo.find({ where: { deletedAt: null }, select: { role: true } })).map(user => user.id);
        // }

        for (const role of roles) {
          const timesheetData = await attendanceRepo
            .createQueryBuilder('attendance')
            .withDeleted()
            .where({
              createdAt: Between(startDate, endDate),
              siteId,
            })
            .leftJoinAndSelect('attendance.site', 'site')
            .leftJoinAndSelect('site.rate', 'rate')
            .andWhere('LOWER(rate.role) = LOWER(:role)', { role })
            .leftJoinAndSelect('attendance.user', 'user')
            .getMany();

          const site = await siteRepo
            .createQueryBuilder('site')
            .withDeleted()
            .where({
              id: siteId,
            })
            .leftJoinAndSelect('site.rate', 'rate')
            .andWhere('rate.role = :role', { role })
            .getOne();

          let hourlyRate: number = 0;
          let totalHours: number = 0;
          let hoursCompleted: number = 0;
          let totalAmount: number = 0;
          let currentSiteTimesheet: any;

          if (site) {
            hourlyRate = site.rate[0].rate;
          }
          if (timesheetData.length !== 0) {
            const uniqueUserIds = new Set(
              timesheetData.map((attendance) => attendance.user.id),
            );
            const totalUniqueUsers = uniqueUserIds.size;
            for (const attendance of timesheetData) {
              hoursCompleted += attendance.totalHours;
              totalHours =
                attendance.site.rate[0].rate * days * totalUniqueUsers; //the totalHours will result less in case of role because site has limited shit hours and roles accumlative hours will exceed them because of number of employees
            }
          }

          totalAmount = hourlyRate * hoursCompleted;
          currentSiteTimesheet = {
            role,
            site,
            hourlyRate,
            hoursCompleted,
            totalHours,
            totalAmount,
          };

          timesheet.push(currentSiteTimesheet);
        }
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
