import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { Company } from '../../../utils/constants';
import { IsDateFormat } from '../../../shared/common/is-date-format.decorator';

export class CreateMultipleEmployeesDto {
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
  noOfLeaves: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  role: string;

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
  dateJoining: Date;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  dateBirth: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  passportNumber: string;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  passportIssue: Date;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  passportExpiry: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  newPassportNumber: string;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  newPassportIssue: Date;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  newPassportExpiry: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  visaNumber: string;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  visaIssue: Date;

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
  @IsString()
  visaStatus: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  visaValidity: string;

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nationality: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  workPermit: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  workPermitPersonal: string;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  workPermitIssue: Date;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  workPermitExpiry: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  newWorkPermit: string;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  newWorkPermitIssue: Date;

  @ApiProperty({
    required: false,
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    default: '2021-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateFormat()
  newWorkPermitExpiry: Date;
}
