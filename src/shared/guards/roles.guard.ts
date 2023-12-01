// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// // import { Role } from '../../utils/constants';
// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { verify } from 'jsonwebtoken';
// import { jwtConfig } from '../../config/jwt.config';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }

//     const authorizationHeader = context.switchToHttp().getRequest()
//       .headers.authorization;

//     if (!authorizationHeader) {
//       throw new UnauthorizedException('Authorization header is missing');
//     }

//     const token = authorizationHeader.split(' ')[1];

//     if (!token) {
//       throw new UnauthorizedException('Token is required');
//     }
//     try {
//       //@ts-ignore
//       const data: Record<JwtPayload> = verify(token, jwtConfig.secret);

//       return requiredRoles.some((role) => data.roles?.includes(role));
//     } catch (error: any) {
//       if (error.name === 'TokenExpiredError') {
//         throw new UnauthorizedException('Token expired');
//       }
//       throw new InternalServerErrorException(error);
//     }
//   }
// }
