import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsInt,
  IsNotEmpty,
  IsArray,
} from 'class-validator';

export class TimesheetDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    required: false,
    type: [Number],
  })
  // @IsArray()
  @IsOptional()
  // @IsNumber({}, { each: true })
  siteIds: number[];

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  month?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  week?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  day?: number;
}
