import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';
import { jwtConfig } from '../../config/jwt.config';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Rate]),
    SharedModule,
  ],
  controllers: [RateController],
  providers: [RateService]
})
export class RateModule {}
