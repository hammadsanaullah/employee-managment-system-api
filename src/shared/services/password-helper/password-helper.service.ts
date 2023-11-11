import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class PasswordHelperService {
  async generatePassword(): Promise<string> {
    try {
      const chars = [
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        '0123456789',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      ];
      const randPwd = [5, 3, 2]
        .map(function (len, i) {
          return Array(len)
            .fill(chars[i])
            .map(function (x) {
              return x[Math.floor(Math.random() * x.length)];
            })
            .join('');
        })
        .concat()
        .join('')
        .split('')
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join('');
      return randPwd;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
