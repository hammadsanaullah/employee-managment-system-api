// import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
// import { MediaService } from './media.service';
// import { UploadMediaDto } from './dto/upload-media.dto';
// import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
// import { FileInterceptor } from '@nestjs/platform-express';

// @ApiTags('media')
// @Controller('media')
// export class MediaController {
//   constructor(private readonly mediaService: MediaService) {}

//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   @Patch("profile-picture")
//   @UseInterceptors(FileInterceptor("picture"))
//   @ApiConsumes("multipart/form-data")
//   updateProfilePicture(
//     @UploadedFile() picture: Express.Multer.File,
//     @Body() uploadMediaDto: UploadMediaDto,
//   ) {
//     uploadMediaDto.picture = picture;
//     return this.mediaService.upload(
//       uploadMediaDto
//     );
//   }
// }
