// import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';
// import { API_KEY, API_SECRET, CLOUD_NAME } from '../../../utils/constants';

// @Injectable()
// export class StorageClientService {
//   constructor() {
//     // Configure Cloudinary with your credentials
//     cloudinary.config({
//       cloud_name: CLOUD_NAME,
//       api_key: API_KEY,
//       api_secret: API_SECRET,
//     });
//   }

//   /**
//    * Uploads an image to Cloudinary
//    * @param {Express.Multer.File} file: Express.Multer.File
//    * @returns {string} Public URL of the uploaded image
//    */
//   async uploadImage(file: Express.Multer.File): Promise<string> {
//     try {

//       const result = await cloudinary.uploader.upload(file.path, {
//         resource_type: 'auto', // Specify the resource type if necessary (e.g., "auto", "image", "video", etc.)
//         folder: 'media', // Replace with your desired folder name
//         use_filename: true, // Use the original filename
//         unique_filename: false, // Do not make filenames unique
//       });

//       // Return the public URL of the uploaded image
//       return result.secure_url;
//     } catch (error) {
//       throw new InternalServerErrorException(error);
//     }
//   }

//   /**
//    * Deletes an image from Cloudinary
//    * @param {string} publicURL: string
//    */
//   async deleteImage(publicURL: string) {
//     try {
//       const publicId = this.extractPublicId(publicURL);
//       await cloudinary.uploader.destroy(publicId);
//     } catch (error) {
//       throw new InternalServerErrorException(error);
//     }
//   }

//   /**
//    * Extracts the public ID from a Cloudinary URL
//    * @param {string} publicURL: string
//    * @returns {string} Public ID
//    */
//   private extractPublicId(publicURL: string): string {
//     const parts = publicURL.split('/');
//     const filename = parts.pop();
//     const publicId = filename?.split('.')[0];
//     return publicId || '';
//   }
// }
