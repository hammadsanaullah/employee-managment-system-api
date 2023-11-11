import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { SessionService } from './services/session/session.service';
import { JwtStrategy } from './guards/jwt.startegy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { PassportModule } from '@nestjs/passport';
import { PasswordHelperService } from './services/password-helper/password-helper.service';

@Module({
  imports: [
    ServicesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtAuthGuard, JwtStrategy, SessionService, PasswordHelperService],
  exports: [ServicesModule, JwtAuthGuard, JwtStrategy, SessionService, PasswordHelperService],
})
export class SharedModule {}
