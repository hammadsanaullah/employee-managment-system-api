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

export class UpdateEmployeeDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  picture: Express.Multer.File;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  employeeCode: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  barCode: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  // @IsPhoneNumber()
  @IsOptional()
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
  noOfLeaves: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  role: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  passportNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  emirateId: string;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  passportExpiry: Date;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  visaExpiry: Date;

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
