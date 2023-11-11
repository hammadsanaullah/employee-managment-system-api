import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ERROR_MESSAGE, Role } from '../../utils/constants';
import { JwtPayload } from '../common/jwt.payload.dto';
import { jwtConfig } from '../../config/jwt.config';
import { QueryRunnerService } from '../services/query-runner/query-runner.service';
import { User } from '../../resources/user/entities/user.entity';
import { Admin } from '../../resources/admin/entities/admin.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryRunner: QueryRunnerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      if (Date.now() >= payload.exp * 1000) {
        throw new UnauthorizedException(ERROR_MESSAGE.JWT_TOKEN_EXPIRED);
      }

      let user: Admin | User;
      if(payload.roles === Role.ADMIN) {
        const adminRepo = this.queryRunner.getRepository(Admin);
        user = await adminRepo
         .createQueryBuilder('admin')
         .where('admin.id = :id', { id: payload.id })
         .andWhere('admin.deletedAt IS NULL')
         .getOne();
       return {
         ...user,
         tokenType: payload.tokenType,
       };
      } else {
        const userRepo = this.queryRunner.getRepository(User);
        user = await userRepo
         .createQueryBuilder('user')
         .where('user.id = :id', { id: payload.id })
         .andWhere('user.deletedAt IS NULL')
         .getOne();
       return {
         ...user,
         tokenType: payload.tokenType,
       };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
