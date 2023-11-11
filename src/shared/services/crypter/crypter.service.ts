// import { Injectable } from '@nestjs/common';
// import { randomBytes } from 'crypto';
// import { AES, enc, HmacSHA512 } from 'crypto-js';
// import { CRYPTER_SECRET } from '../../../utils/constants';

// @Injectable()
// export class CrypterService {
//   public randomCryptoData(): string {
//     return randomBytes(20).toString('hex');
//   }

//   public encrypt(message: string): string {
//     const hash = AES.encrypt(message, CRYPTER_SECRET).toString();
//     return hash;
//   }

//   public decrypt(hash: string, tokenData: string): boolean {
//     const bytes = AES.decrypt(hash, CRYPTER_SECRET);
//     const decryptedMessage = bytes.toString(enc.Utf8);
//     return decryptedMessage === tokenData;
//   }

//   public generateHMAC(message: string): string {
//     const hash = HmacSHA512(message, CRYPTER_SECRET).toString();
//     return hash;
//   }
// }
