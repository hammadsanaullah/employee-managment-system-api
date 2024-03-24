import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsInt,
  IsNotEmpty,
  IsArray,
  IsString,
} from 'class-validator';
import { TypeOptions } from '../../../utils/constants';

export class TimesheetSiteDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  siteId: number;

  // @ApiProperty({
  //   required: false,
  //   type: [Number],
  // })
  // // @IsArray()
  // @IsOptional()
  // // @IsNumber({}, { each: true })
  // userIds: number[];

  // @ApiProperty({
  //   required: false,
  //   type: [String],
  // })
  // // @IsArray()
  // @IsOptional()
  // // @IsNumber({}, { each: true })
  // roles: string[];

  @ApiProperty({
    required: true,
    enum: TypeOptions,
  })
  @IsNotEmpty()
  @IsString()
  type: TypeOptions;

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
