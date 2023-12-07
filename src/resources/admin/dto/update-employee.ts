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
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  picture: Express.Multer.File;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  employeeCode: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  barCode: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  // @IsPhoneNumber()
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

  @ApiProperty({ required: true })
  @IsNotEmpty()
  noOfLeaves: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsIn([Company.INTERNAL, Company.EXTERNAL], {
    message: 'Company must be either "INTERNAL", "EXTERNAL"',
  })
  company: Company;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  companyTitle: string;
}
