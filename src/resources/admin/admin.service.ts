import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ResponseDto } from '../../shared/common/response.dto';
import { QueryRunnerService } from '../../shared/services/query-runner/query-runner.service';
import { JwtService } from '@nestjs/jwt';
import { Crypt } from '../../shared/services/crypter/crypt';
import { Admin } from './entities/admin.entity';
import {
  COMMON_MESSAGE,
  Company,
  ERROR_MESSAGE,
  JWT_TOKEN_TYPE,
} from '../../utils/constants';
import { jwtConfig } from '../../config/jwt.config';
import { PasswordHelperService } from '../../shared/services/password-helper/password-helper.service';
import { SignInAdminDto } from './dto/sign-in-admin.dto';
import { CreateEmployeeDto } from './dto/create-new-employee';
import { User } from '../user/entities/user.entity';
import { UpdateEmployeeDto } from './dto/update-employee';

@Injectable()
export class AdminService {
  constructor(
    private readonly queryRunner: QueryRunnerService,
    private readonly jwt: JwtService,
    private readonly passwordHelper: PasswordHelperService,
  ) {}

  logger = new Logger(AdminService.name);

  async create(createAdminDto: CreateAdminDto): Promise<ResponseDto> {
    const { email, username, password } = createAdminDto;

    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      // const password = await this.passwordHelper.generatePassword();

      await queryRunner.startTransaction();
      const adminRepo = queryRunner.manager.getRepository(Admin);

      const hashedPassword = await Crypt.hashString(password);

      const adminExist = await adminRepo
        .createQueryBuilder('admin')
        .where('admin.email = :email', { email })
        .orWhere('admin.username = :username', { username })
        .getOne();

      if (adminExist) {
        throw new ConflictException('Admin Already Exist!');
      }

      const admin = await adminRepo.save({
        ...createAdminDto,
        password: hashedPassword,
      });

      const accessToken = this.jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          roles: admin.role,
          tokenType: JWT_TOKEN_TYPE.LOGIN,
        },
        {
          secret: jwtConfig.secret,
          expiresIn: jwtConfig.signOptions.expiresIn,
        },
      );

      delete admin.password;

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.CREATE_ADMIN_USER,
        data: {
          admin,
          accessToken,
          password, // TODO: For now later removed.
        },
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (
        error?.code == '23505' &&
        error?.detail ===
          `Key (email)=(${createAdminDto.email}) already exists.`
      ) {
        throw new ConflictException(
          ERROR_MESSAGE.ALREADY_EXIST(createAdminDto.email),
        );
      }
      throw new InternalServerErrorException(error);
    } finally {
      queryRunner.release();
    }
  }

  async signIn(signInDto: SignInAdminDto): Promise<ResponseDto> {
    const queryRunner = this.queryRunner.createQueryRunner();
    try {
      const { username, password } = signInDto;
      const adminRepo = queryRunner.manager.getRepository(Admin);

      const admin = await adminRepo
        .createQueryBuilder('admin')
        .where('admin.username = :username', { username })
        .getOne();

      if (!admin) {
        throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
      }

      if (!(await Crypt.compare(password, admin.password))) {
        throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
      }

      const accessToken = this.jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          roles: "ADMIN",
          tokenType: JWT_TOKEN_TYPE.LOGIN,
        },
        {
          secret: jwtConfig.secret,
          expiresIn: jwtConfig.signOptions.expiresIn,
        },
      );

      delete admin.password;

      return {
        message: COMMON_MESSAGE.SIGNIN_SUCCESSFULLY,
        data: {
          admin,
          accessToken,
        },
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<ResponseDto> {
    const queryRunner = this.queryRunner.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const { company, companyTitle, ...rest } = createEmployeeDto;
      const userRepo = queryRunner.manager.getRepository(User);

      if(company === Company.INTERNAL && companyTitle) {
        throw new BadRequestException("Can't provide companyTitle if employee is INTERNAL")
      }
      const user = await userRepo.save({
        company,
        companyTitle,
        ...rest
      })

      const returnUser =  await userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id: user.id })
      .getOne();

      await queryRunner.commitTransaction();

      return {
        message: COMMON_MESSAGE.SUCCESSFULLY_CREATED(User.name),
        data: {
          returnUser
        },
      };
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      if (
        error?.code == '23505' &&
        error?.detail ===
          `Key (email)=(${createEmployeeDto.email}) already exists.`
      ) {
        throw new ConflictException(
          ERROR_MESSAGE.ALREADY_EXIST(createEmployeeDto.email),
        );
      }
      if (
        error?.code == '23505' &&
        error?.detail ===
          `Key (phoneNumber)=(${createEmployeeDto.phoneNumber}) already exists.`
      ) {
        throw new ConflictException(
          ERROR_MESSAGE.ALREADY_EXIST(createEmployeeDto.phoneNumber),
        );
      }
      throw new InternalServerErrorException(error);
    } finally {
      queryRunner.release();
    }
  }

  // async updateEmployee(updateEmployeeDto: UpdateEmployeeDto): Promise<ResponseDto> {
  //   const queryRunner = this.queryRunner.createQueryRunner();
  //   try {
  //     await queryRunner.connect();
  //     await queryRunner.startTransaction();
  //     const { userId, ...rest } = updateEmployeeDto;
  //     const userRepo = queryRunner.manager.getRepository(User);
  //     const userLocationRepo = queryRunner.manager.getRepository(UserLocation);

  //     const locationRepo = queryRunner.manager.getRepository(Location);

  //     await userRepo.update({ id: userId },{
  //       ...rest
  //     })

  //     const returnUser =  await userRepo
  //     .createQueryBuilder('user')
  //     .where('user.id = :id', { id: userId })
  //     .leftJoinAndSelect('user.userLocations', 'userLocations')
  //     .getOne();

  //     await queryRunner.commitTransaction();

  //     return {
  //       message: COMMON_MESSAGE.SUCCESSFULLY_UPDATED(User.name),
  //       data: {
  //         returnUser
  //       },
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     await queryRunner.rollbackTransaction();
  //     if (
  //       error?.code == '23505' &&
  //       error?.detail ===
  //         `Key (officialEmail)=(${updateEmployeeDto.officialEmail}) already exists.`
  //     ) {
  //       throw new ConflictException(
  //         ERROR_MESSAGE.ALREADY_EXIST(updateEmployeeDto.officialEmail),
  //       );
  //     }
  //     if (
  //       error?.code == '23505' &&
  //       error?.detail ===
  //         `Key (email)=(${updateEmployeeDto.email}) already exists.`
  //     ) {
  //       throw new ConflictException(
  //         ERROR_MESSAGE.ALREADY_EXIST(updateEmployeeDto.email),
  //       );
  //     }
  //     if (
  //       error?.code == '23505' &&
  //       error?.detail ===
  //         `Key (phoneNumber)=(${updateEmployeeDto.phoneNumber}) already exists.`
  //     ) {
  //       throw new ConflictException(
  //         ERROR_MESSAGE.ALREADY_EXIST(updateEmployeeDto.phoneNumber),
  //       );
  //     }
  //     throw new InternalServerErrorException(error);
  //   } finally {
  //     queryRunner.release();
  //   }
  // }
}
