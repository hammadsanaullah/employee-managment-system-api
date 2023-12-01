import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
// import { MediaModule } from './media/media.module';
// import { LocationModule } from './location/location.module';
import { SiteModule } from './site/site.module';
import { RateModule } from './rate/rate.module';
import { AttendanceModule } from './attendance/attendance.module';
import { TimesheetModule } from './timesheet/timesheet.module';

@Module({
  imports: [
    UserModule,
    SharedModule,
    AdminModule,
    SiteModule,
    RateModule,
    AttendanceModule,
    TimesheetModule,
  ],
})
export class ResourcesModule {}
