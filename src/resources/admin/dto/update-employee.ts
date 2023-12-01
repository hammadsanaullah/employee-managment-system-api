import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { Company } from '../../../utils/constants';

export class UpdateEmployeeDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  employeeCode: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  barCode: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  //   @ApiProperty()
  //   @IsNumber()
  //   @IsNotEmpty()
  //   hourlyRate: number;

  //   @ApiProperty()
  //   @IsNotEmpty()
  //   @IsNumber()
  //   locationId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  noOfLeaves: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  role: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn([Company.INTERNAL, Company.EXTERNAL], {
    message: 'Company must be either "INTERNAL", "EXTERNAL"',
  })
  company: Company;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  companyTitle: string;
}
