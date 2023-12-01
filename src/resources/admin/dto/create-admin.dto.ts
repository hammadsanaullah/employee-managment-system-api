import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 32)
  name: string;

  @ApiProperty({
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 32)
  username: string;

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false
  })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    required: true
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
