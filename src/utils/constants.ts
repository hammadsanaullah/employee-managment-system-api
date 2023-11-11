import { config } from 'dotenv';
import { DataSourceOptions, SelectQueryBuilder } from 'typeorm';
import { User } from '../resources/user/entities/user.entity';
import { Location } from '../resources/location/entities/location.entity';
import { Admin } from '../resources/admin/entities/admin.entity';
import { Media } from '../resources/media/entities/media.entity';
import { UserLocation } from '../resources/user/entities/user-location.entity';
import { Attendance } from '../resources/user/entities/attendance.entity';
config();

export const COMMON_MESSAGE = {
  SERVER_IS_UP: `Server is up and running`,
  SIGNUP_SUCCESSFULLY: `Signed up successfully`,
  SIGNIN_SUCCESSFULLY: `Signed in successfully`,
  CREATE_ADMIN_USER: `Admin created successfully`,
  UPDATE_ADMIN_USER: `Admin updated successfully`,
  OTP_VERIFIED: `OTP verified successfully.`,
  OTP_RESEND: `OTP resent successfully`,
  OTP_SENT: `OTP sent successfully.`,
  PASSWORD_UPDATED: `Password updated successfully`,
  SUCCESSFULLY_CREATED: (entityName: string) => {
    return `${entityName} created successfully`;
  },
  SUCCESSFULLY_UPDATED: (entityName: string) => {
    return `${entityName} updated successfully`;
  },
  SUCCESSFULLY_DELETED: (entityName: string) => {
    return `${entityName} deleted successfully`;
  },
  SUCCESSFULLY_GET: (entityName: string) => {
    return `${entityName} fetched successfully`;
  },
};

export enum JWT_USER_TYPE {
  ADMIN = 'ADMIN',
  USER = 'USER',
  RIDER = 'RIDER',
  GUEST_USER = 'GUEST_USER',
}

export enum JWT_TOKEN_TYPE {
  OTP = 'OTP',
  LOGIN = 'LOGIN',
  CHANGE_PASSWORD = 'CHANGE PASSWORD',
  FORGET_PASSWORD = 'FORGET PASSWORD',
  REFRESH = 'REFRESH',
}

export const ERROR_MESSAGE = {
  PASSWORD_MISMATCH: `Password mismatch`,
  INVALID_CREDENTIALS: `Invalid Credentials`,
  OLD_CREDENTIALS: `You cannot reuse the old password`,
  USER_NOT_FOUND: `User not found`,
  PICTURE_NOT_FOUND: `Picture not found`,
  ADMIN_NOT_FOUND: `Admin not found`,
  ADMIN_NAME_ALREADY_EXIST: `Admin name already exists`,
  INVALID_OTP: `Provided OTP is invalid`,
  CATEGORY_NOT_FOUND: `Category not found!`,
  CATEGORY_UNIQUE_TITLE: `Category is already taken!`,
  SUB_CATEGORY_NOT_FOUND: `Sub-category not found`,
  JWT_TOKEN_EXPIRED: `JWT Token is expired`,
  USER_NOT_SUPERVISOR: `Only supervisor can login`,
  WRONG_TOKEN: (tokenType: string) =>
    `Route not allowed for ${tokenType} token`,
  ALREADY_EXIST: (key: string) => `${key} already exists`,
  NOT_FOUND: (entityName: string) => `${entityName} not found`,
  IS_REQUIRED: (entityName: string) =>
    `${entityName} is required but not given`,
};

export enum APP_ENVIRONMENTS {
  DEVELOPMENT = 'development',
  DEBUG = 'debug',
  PRODUCTION = 'production',
}

export enum CATEGORY {
  TOP_LEVEL = 2,
  SUB_LEVEL = 4,
  CATEGORY_START = 1,
  LAST_LEVEL = 4,
}

export const EMAIL: string = process.env.EMAIL;

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPE_ORM_DATABASE_HOST,
  port: +process.env.TYPE_ORM_DATABASE_PORT,
  username: process.env.TYPE_ORM_DATABASE_USERNAME,
  password: process.env.TYPE_ORM_DATABASE_PASSWORD,
  database: process.env.TYPE_ORM_DATABASE_NAME,
};

//to be used for non-querybuilder transactions
export const GENERATE_SKIP_TAKE = (
  page: number,
  limit: number,
): { skip: number; take: number } => {
  const skip = (page - 1) * limit;
  const take = limit;

  return {
    skip,
    take,
  };
};

export const PAGINATION_CONSTRUCTOR = (
  queryBuilder: SelectQueryBuilder<any>,
  page: number,
  limit: number,
): SelectQueryBuilder<any> => {
  const skip = (page - 1) * limit;
  return queryBuilder.skip(skip).take(limit);
};

export const METADATA_CONSTRUCTOR = (
  page: number,
  limit: number,
  count: number,
) => {
  const totalItems = count;
  const itemCount = count;
  const itemsPerPage = limit;
  const totalPages = Math.ceil(count / limit);
  const currentPage = page;

  return {
    totalItems,
    itemCount,
    itemsPerPage,
    totalPages,
    currentPage,
  };
};

export const TypeORMEntities = [
  User,
  Location,
  Admin,
  Media,
  UserLocation,
  Attendance
];

export const CRYPTER_SECRET = process.env.CRYPTER_SECRET;

export enum Role {
  EMPLOYEE = 'EMPLOYEE',
  SUPERVISOR = 'SUPERVISOR',
  ADMIN = 'ADMIN',
}

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
