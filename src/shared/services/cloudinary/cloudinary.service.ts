import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as streamfier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';
import { API_KEY, API_SECRET, CLOUD_NAME } from '../../../utils/constants';

@Injectable()
export class CloudinaryService {
  protected logger = new Logger(CloudinaryService.name);

  constructor() {
    cloudinary.config({
      api_key: API_KEY,
      api_secret: API_SECRET,
      cloud_name: CLOUD_NAME,
    });
  }

  async upload(file: Express.Multer.File) {
    try {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'media',
            format: 'jpg',
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          },
        );

        streamfier.createReadStream(file.buffer).pipe(uploadStream);
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(publicId: string) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
