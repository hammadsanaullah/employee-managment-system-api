import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
// import { MediaModule } from './media/media.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [UserModule, LocationModule, SharedModule, AdminModule],
})
export class ResourcesModule {}
