// import { Injectable } from '@nestjs/common';
// import { CrypterService } from '../crypter/crypter.service';

// @Injectable()
// export class OtpService {
//   private timeStep = 60; //number of seconds the token is valid for...
//   private digits = 6; //length of token
//   constructor(private readonly crypter: CrypterService) {}

//   public generateTotpToken(digits?: number, timeStep?: number): string {
//     try {
//       if (timeStep) {
//         this.timeStep = timeStep;
//       }
//       if (digits) {
//         this.digits = digits;
//       }
//       let token: string;

//       do {
//         const epoch = Math.floor(Date.now() / 1000 / this.timeStep);
//         token = this.generateTotpTokenFromEpoch(epoch, this.digits);
//       } while (token.includes('NaN'));

//       return token;
//     } catch (error: any) {
//       console.log(`Error occurred in otp service`);
//       console.log(error);
//       console.log(error.message);
//       // Handle the error here, e.g., return a default value or throw a new error
//       return 'error_token'; // Change this to an appropriate value
//     }
//   }

//   public verifyTotpToken(token?: string, digits?: number): boolean {
//     const epoch = Math.floor(Date.now() / 1000 / this.timeStep);
//     const currentToken = this.generateTotpTokenFromEpoch(
//       epoch,
//       digits || this.digits,
//     );
//     const previousToken = this.generateTotpTokenFromEpoch(
//       epoch - 1,
//       digits || this.digits,
//     );
//     return currentToken === token || previousToken === token;
//   }

//   private generateTotpTokenFromEpoch(epoch: number, digits: number): string {
//     const hash = this.crypter.generateHMAC(epoch.toString());
//     const offset = parseInt(hash.substring(hash.length - 1), 16);
//     const token =
//       parseInt(hash.substring(offset * 2, digits * 2), 16) %
//       Math.pow(10, digits);
//     return token.toString().padStart(digits, '0');
//   }
// }
