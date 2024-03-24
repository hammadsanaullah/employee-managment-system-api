import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRateDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  rate: number;
}
