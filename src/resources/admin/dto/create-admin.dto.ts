import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 32)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 32)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber: string;
}
