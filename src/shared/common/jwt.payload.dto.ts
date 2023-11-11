export class JwtPayload {
  phoneNumber: string;
  id: string;
  roles: string;
  tokenType: string;
  iat: number;
  exp: number;
}
