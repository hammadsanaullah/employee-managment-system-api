import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { SharedModule } from '../../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Location } from './entities/location.entity';
import { jwtConfig } from '../../config/jwt.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Location]),
    JwtModule.register(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
