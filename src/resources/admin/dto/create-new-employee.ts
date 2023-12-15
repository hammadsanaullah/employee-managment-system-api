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
import { IsDateFormat } from '../../../shared/common/is-date-format.decorator';

export class CreateEmployeeDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  picture: Express.Multer.File;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  employeeCode: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  barCode: string;

  @ApiProperty({ required: true })
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
  @IsString()
  passportNumber: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  emirateId: string;

  @ApiProperty({
    required: true,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateFormat()
  passportExpiry: Date;

  @ApiProperty({
    required: true,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateFormat()
  visaExpiry: Date;

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
