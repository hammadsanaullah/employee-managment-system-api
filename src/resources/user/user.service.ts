import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { QueryRunnerService } from '../../shared/services/query-runner/query-runner.service';
import { SessionService } from '../../shared/services/session/session.service';
import { User } from './entities/user.entity';

import {
  COMMON_MESSAGE,
  ERROR_MESSAGE,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_TOKEN_TYPE,
} from '../../utils/constants';
import { jwtConfig } from '../../config/jwt.config';
import { SignInDto } from './dto/sign-in.dto';
import { ResponseDto } from '../../shared/common/response.dto';
import { ToggleCheckInCheckOutDto } from './dto/toggle-checkin-checkout.dto';
import { PaginationDto } from '../../shared/common/pagination.dto';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    private readonly queryRunner: QueryRunnerService,
    private readonly jwt: JwtService,
    private readonly session: SessionService,
  ) {}

  logger = new Logger(UserService.name);

  async find(role: string): Promise<ResponseDto> {
    try {
      const userRepo = this.queryRunner.manager.getRepository(User);
      const users = await userRepo
        .createQueryBuilder('user')
        .where('user.deletedAt IS NULL')
        .andWhere('LOWER(user.role) = LOWER(:role)', { role })
        .getMany();
      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(User.name),
        data: users,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(barCode: string): Promise<ResponseDto> {
    try {
      const userRepo = this.queryRunner.manager.getRepository(User);
      const user = await userRepo.findOne({
        where: { barCode, deletedAt: null },
      });

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(User.name),
        data: user,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<ResponseDto> {
    try {
      const userRepo = this.queryRunner.manager.getRepository(User);
      const user = await userRepo.findOne({
        where: { id, deletedAt: null },
      });

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(User.name),
        data: user,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(pagination: PaginationDto): Promise<ResponseDto> {
    try {
      const userRepo = this.queryRunner.manager.getRepository(User);
      const query = userRepo
        .createQueryBuilder('user')
        .where('user.deletedAt IS null')
        .orderBy('user.id', 'DESC');

      const paginatedUsers = await paginate<User>(query, pagination);

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_GET(User.name),
        data: paginatedUsers,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  // private getMonthString(monthIndex: number): string {
  //   // Convert month index to month string (e.g., 0 -> 'January', 1 -> 'February', etc.)
  //   const months = [
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December',
  //   ];
  //   if (monthIndex < 0 || monthIndex >= months.length) {
  //     throw new Error('Invalid month index');
  //   }
  //   return months[monthIndex];
  // }

  // // use this to get number of weeks relative to year
  // // private getWeekNumber(date: Date): number {
  // //   // Logic to calculate the ISO week number based on the date
  // //   // Adjust as needed for your specific requirements
  // //   const january4 = new Date(date.getFullYear(), 0, 4);
  // //   const daysDiff =
  // //     (date.getTime() - january4.getTime()) / (24 * 60 * 60 * 1000);
  // //   const weekNumber = Math.ceil((daysDiff + january4.getDay() + 1) / 7);
  // //   return weekNumber === 0
  // //     ? this.getWeekNumber(new Date(date.getFullYear() - 1, 11, 31))
  // //     : weekNumber;
  // // }

  // private getWeekNumber(date: Date): number {
  //   // Clone the date to avoid modifying the original date
  //   const clonedDate = new Date(date.getTime());

  //   // Set the date to the first day of the month
  //   clonedDate.setDate(1);

  //   // Calculate the difference in full weeks
  //   const weeksDiff = Math.floor((date.getDate() - clonedDate.getDate() + clonedDate.getDay()) / 7);

  //   return weeksDiff + 1; // Adding 1 to start the count from 1
  // }

  // private getDayOfWeekString(dayIndex: number): string {
  //   // Convert day index to day string (e.g., 0 -> 'Sunday', 1 -> 'Monday', etc.)
  //   const daysOfWeek = [
  //     'Sunday',
  //     'Monday',
  //     'Tuesday',
  //     'Wednesday',
  //     'Thursday',
  //     'Friday',
  //     'Saturday',
  //   ];
  //   if (dayIndex < 0 || dayIndex >= daysOfWeek.length) {
  //     throw new Error('Invalid day index');
  //   }
  //   return daysOfWeek[dayIndex];
  // }

  // async signIn(signInDto: SignInDto): Promise<ResponseDto> {
  //   const queryRunner = this.queryRunner.createQueryRunner();
  //   try {
  //     const { email, pinCode } = signInDto;
  //     const userRepo = queryRunner.manager.getRepository(User);

  //     const user = await userRepo
  //       .createQueryBuilder('user')
  //       .where('user.email = :email', { email })
  //       .getOne();

  //     if (!user) {
  //       throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
  //     }

  //     if (pinCode !== user.pinCode) {
  //       throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
  //     }
  //     if (user.role !== Role.SUPERVISOR) {
  //       throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_SUPERVISOR);
  //     }

  //     const accessToken = this.jwt.sign(
  //       {
  //         id: user.id,
  //         phoneNumber: user.phoneNumber,
  //         email: user.email,
  //         roles: user.role,
  //         tokenType: JWT_TOKEN_TYPE.LOGIN,
  //       },
  //       {
  //         secret: jwtConfig.secret,
  //         expiresIn: jwtConfig.signOptions.expiresIn,
  //       },
  //     );

  //     return {
  //       message: COMMON_MESSAGE.SIGNIN_SUCCESSFULLY,
  //       data: {
  //         user,
  //         accessToken,
  //       },
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async toggleCheckInOrCheckOut(
  //   toggleDto: ToggleCheckInCheckOutDto,
  // ): Promise<ResponseDto> {
  //   const queryRunner = this.queryRunner.createQueryRunner();
  //   try {
  //     const { userId, locationId } = toggleDto;
  //     const userRepo = queryRunner.manager.getRepository(User);
  //     const userLocationRepo = queryRunner.manager.getRepository(UserLocation);
  //     const attendanceRepo = queryRunner.manager.getRepository(Attendance);

  //     const currentDate = new Date();
  //     const year = currentDate.getFullYear();
  //     const month = this.getMonthString(currentDate.getMonth());
  //     const week = this.getWeekNumber(currentDate);
  //     const weekDay = this.getDayOfWeekString(currentDate.getDay());

  //     let user = await userRepo
  //     .createQueryBuilder('user')
  //     .where('user.id = :id', { id: userId })
  //     .getOne();

  //     if (!user) {
  //       throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
  //     }

  //     if (user.checkedIn) {
  //       user = await userRepo
  //       .createQueryBuilder('user')
  //       .where('user.id = :id', { id: userId })
  //       .leftJoinAndSelect('user.userLocations', 'userLocations')
  //       .leftJoinAndSelect('userLocations.attendance', 'attendance')
  //       .andWhere('userLocations.locationId = :locationId', { locationId })
  //       .andWhere('attendance.year = :year', { year })
  //       .andWhere('attendance.month = :month', { month })
  //       .andWhere('attendance.week = :week', { week })
  //       .andWhere('attendance.weekDay = :weekDay', { weekDay })
  //       .getOne();
  //       const elements  = user.userLocations[0].attendance.length;
  //       //check last element of attendance array and update it to checkout
  //       await attendanceRepo.update(
  //         { id: user.userLocations[0].attendance[elements - 1].id },
  //         { checkOut: new Date() },
  //       );

  //       await userRepo.update({ id: userId }, { checkedIn: false });
  //     } else {
  //       user = await userRepo
  //       .createQueryBuilder('user')
  //       .where('user.id = :id', { id: userId })
  //       .leftJoinAndSelect('user.userLocations', 'userLocations')
  //       .leftJoinAndSelect('userLocations.attendance', 'attendance')
  //       .andWhere('userLocations.locationId = :locationId', { locationId })
  //       .getOne();
  //       //simply checkin
  //       await attendanceRepo.save({
  //         year,
  //         month,
  //         week,
  //         weekDay,
  //         checkIn: new Date(),
  //         userLocationId: user.userLocations[0].id,
  //       });
  //       await userRepo.update({ id: userId }, { checkedIn: true });
  //     }

  //     user = await userRepo
  //       .createQueryBuilder('user')
  //       .where('user.id = :id', { id: userId })
  //       .leftJoinAndSelect('user.userLocations', 'userLocations')
  //       .leftJoinAndSelect('userLocations.attendance', 'attendance')
  //       .andWhere('userLocations.locationId = :locationId', { locationId })
  //       .andWhere('attendance.year = :year', { year })
  //       .andWhere('attendance.month = :month', { month })
  //       .andWhere('attendance.week = :week', { week })
  //       .andWhere('attendance.weekDay = :weekDay', { weekDay })
  //       .getOne();

  //     return {
  //       message: COMMON_MESSAGE.SUCCESSFULLY_UPDATED('Check Status of User'),
  //       data: {
  //         user,
  //       },
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async findOne(): Promise<ResponseDto> {
  //   const queryRunner = this.queryRunner.createQueryRunner();
  //   try {
  //     const userId = this.session.getUserId();
  //     const userRepo = queryRunner.manager.getRepository(User);
  //     const user = await userRepo.findOne({
  //       where: { id: userId, deletedAt: null },
  //       relations: ['userProfile', 'businessProfile'],
  //     });

  //     delete user.password;

  //     return {
  //       message: COMMON_MESSAGE.SUCCESSFULLY_GET(user.email),
  //       data: {
  //         user,
  //       },
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async update(updateUserDto: UpdateUserDto): Promise<ResponseDto> {
  //   const queryRunner = this.queryRunner.createQueryRunner();
  //   try {
  //     await queryRunner.connect();
  //     await queryRunner.startTransaction();

  //     const userId = this.session.getUserId();
  //     const userRole = this.session.getUserRole();
  //     const { comment, name, ownerName, subCategory, ...rest } = updateUserDto;

  //     const userRepo = queryRunner.manager.getRepository(User);
  //     const userProfile = queryRunner.manager.getRepository(UserProfile);
  //     const businessProfile =
  //       queryRunner.manager.getRepository(BusinessProfile);

  //     await userRepo.update({ id: userId }, { name });

  //     if (userRole == Role.USER) {
  //       await userProfile.update({ userId }, { ...rest });
  //     } else if (userRole == Role.BUSINESS) {
  //       await businessProfile.update(
  //         { businessId: userId },
  //         { comment, ownerName, subCategory, ...rest },
  //       );
  //     }

  //     const user = await userRepo.findOne({
  //       where: { id: userId, deletedAt: null },
  //       relations: ['userProfile', 'businessProfile'],
  //     });

  //     delete user.password;

  //     return {
  //       message: COMMON_MESSAGE.SUCCESSFULLY_UPDATED(user.name),
  //       data: { user: user },
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     await queryRunner.rollbackTransaction();
  //     throw new InternalServerErrorException(error);
  //   } finally {
  //     queryRunner.release();
  //   }
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
