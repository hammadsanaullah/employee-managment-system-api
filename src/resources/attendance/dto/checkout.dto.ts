import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckoutDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  hours: number;
}
