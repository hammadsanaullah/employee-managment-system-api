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
import { Role } from '../../../utils/constants';

export class CreateEmployeeDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  workAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  workLocation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  officialEmail: string;

//   @ApiProperty()
//   @IsNumber()
//   @IsNotEmpty()
//   hourlyRate: number;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   locationId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  employeeType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pinCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  barCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn([Role.SUPERVISOR, Role.EMPLOYEE], {
    message: 'Role must be either "USER", "BUSINESS"',
  })
  role: Role;

  @ApiProperty({
    required: true,
    example: [
      {
        hourlyRate: 1,
        locationId: 1,
      },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  payload: HourlyRateLocation[];
}

export class HourlyRateLocation {
    @ApiProperty({
      example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    hourlyRate: number;
  
    @ApiProperty({
      example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    locationId: number;
  }
