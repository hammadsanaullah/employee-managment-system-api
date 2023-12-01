import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  siteId: number;

  @ApiProperty({
    required: true,
    example: '13:30',
  })
  @IsNumber()
  @IsNotEmpty()
  shiftTime: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  barCode: string;
}
