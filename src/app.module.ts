import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResourcesModule } from './resources/resources.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './shared/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register(jwtConfig),
    ConfigModule.forRoot(),
    ResourcesModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
