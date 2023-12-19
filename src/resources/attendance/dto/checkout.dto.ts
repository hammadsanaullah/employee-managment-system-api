import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CheckoutDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  hours: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  reason: string;
}
