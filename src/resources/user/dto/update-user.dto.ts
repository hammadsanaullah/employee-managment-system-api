import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
// import { Role } from '../../../utils/constants';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
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
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  subCategory: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsEmail()
  // email: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsPhoneNumber()
  // phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;
}
