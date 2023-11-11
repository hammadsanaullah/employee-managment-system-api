// import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
// import { UploadMediaDto } from './dto/upload-media.dto';
// import { ResponseDto } from '../../shared/common/response.dto';
// import { QueryRunnerService } from '../../shared/services/query-runner/query-runner.service';
// import { SessionService } from '../../shared/services/session/session.service';
// import { JwtService } from '@nestjs/jwt';
// // import { StorageClientService } from '../../shared/services/storage-client/storage-client.service';
// import { Admin } from 'typeorm';
// import { User } from '../user/entities/user.entity';
// import { COMMON_MESSAGE, ERROR_MESSAGE, Role } from '../../utils/constants';
// import { Media } from './entities/media.entity';

// @Injectable()
// export class MediaService {
//   constructor(
//     private readonly queryRunner: QueryRunnerService,
//     private readonly session: SessionService,
//     private readonly jwt: JwtService,
//     // private readonly storage: StorageClientService,
//   ) {}

//   async upload(uploadMediaDto: UploadMediaDto): Promise<ResponseDto> {
//     const userId = this.session.getUserId();
//     const role = this.session.getUserRole();
//     const queryRunner = this.queryRunner.createQueryRunner();
//     await queryRunner.connect();
//     try {
//       await queryRunner.startTransaction();
//       const { picture } = uploadMediaDto;
//       const adminRepo = this.queryRunner.manager.getRepository(Admin);
//       const userRepo = this.queryRunner.manager.getRepository(User);
//       const mediaRepo = this.queryRunner.manager.getRepository(Media);
//       if (!picture) {
//         throw new BadRequestException(ERROR_MESSAGE.PICTURE_NOT_FOUND);
//       }
//       const exist = await mediaRepo.findOne({
//         where: [{ adminId: userId }, { userId: userId }],
//         select: { imageUrl: true },
//       });
//       if (exist) {
//         await this.storage.deleteImage(exist.imageUrl);
//         const imageUrl = await this.storage.uploadImage(picture);
//         if (role == Role.ADMIN) {
//           await mediaRepo.update({ adminId: userId }, { imageUrl });
//         } else if (role == Role.BUSINESS || role == Role.USER) {
//           await mediaRepo.update({ userId: userId }, { imageUrl });
//         }
//       } else {
//         const imageUrl = await this.storage.uploadImage(picture);
//         if (role == Role.ADMIN) {
//           await mediaRepo.save({ adminId: userId, imageUrl });
//         } else if (role == Role.BUSINESS || role == Role.USER) {
//           await mediaRepo.save({ userId: userId, imageUrl });
//         }
//       }
//       await queryRunner.commitTransaction();
//       return {
//         data: COMMON_MESSAGE.SUCCESSFULLY_UPDATED('Profile picture'),
//         message: COMMON_MESSAGE.SUCCESSFULLY_UPDATED('Profile picture'),
//       };
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw new InternalServerErrorException(error);
//     } finally {
//       await queryRunner.release();
//     }
//   }
// }
