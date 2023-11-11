import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from '../../shared/shared.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
