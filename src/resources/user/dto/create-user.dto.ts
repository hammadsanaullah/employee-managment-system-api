import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
// import { Role } from '../../../utils/constants';

export class CreateUserDto {
  //name, address, province, phoneNumber, email, comment(for business only)

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2, 32)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2, 32)
  ownerName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  province: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subCategory: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsIn([Role.SUPERVISOR, Role.EMPLOYEE], {
  //   message: 'Role must be either "USER", "BUSINESS"',
  // })
  // role: Role;
}
