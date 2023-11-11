// import { Module } from '@nestjs/common';
// import { MediaService } from './media.service';
// import { MediaController } from './media.controller';
// import { SharedModule } from '../../shared/shared.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../user/entities/user.entity';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConfig } from '../../config/jwt.config';
// import { PassportModule } from '@nestjs/passport';

// @Module({
//   imports: [
//     SharedModule,
//     TypeOrmModule.forFeature([User]),
//     JwtModule.register(jwtConfig),
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//   ],
//   controllers: [MediaController],
//   providers: [MediaService],
// })
// export class MediaModule {}
