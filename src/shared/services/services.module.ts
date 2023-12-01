import { Module } from '@nestjs/common';
import { QueryRunnerService } from './query-runner/query-runner.service';
// import { CrypterService } from './crypter/crypter.service';
// import { OtpService } from './otp/otp.service';
import { PasswordHelperService } from './password-helper/password-helper.service';
// import { StorageClientService } from './storage-client/storage-client.service';
// import { HelpersService } from './helpers/helpers.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduledJobsService } from './scheduled-jobs/scheduled-jobs.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
@Module({
  imports: [HttpModule],
  providers: [
    QueryRunnerService,
    // CrypterService,
    // OtpService,
    PasswordHelperService,
    ScheduledJobsService,
    CloudinaryService,
    // StorageClientService,
    // HelpersService
  ],
  exports: [QueryRunnerService, CloudinaryService],
})
export class ServicesModule {}
