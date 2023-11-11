import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class UpdateEmployeeDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  workAddress: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  workLocation: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  department: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  officialEmail: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  employeeType: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pinCode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  barCode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role: string;
}
