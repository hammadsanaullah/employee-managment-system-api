import { JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';
config();

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'devSecret',
  signOptions: {
    expiresIn: +process.env.JWT_EXPIRE_IN || '30d',
  },
};
