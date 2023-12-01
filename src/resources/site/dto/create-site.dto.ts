import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSiteDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  site: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  emirates: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  shiftHours: number;
}
