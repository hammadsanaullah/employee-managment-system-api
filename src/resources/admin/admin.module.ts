import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Admin]),
    SharedModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
