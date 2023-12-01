import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from '../../config/jwt.config';
import { Timesheet } from './entities/timesheet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Timesheet]),
    SharedModule,
  ],
  controllers: [TimesheetController],
  providers: [TimesheetService]
})
export class TimesheetModule {}
