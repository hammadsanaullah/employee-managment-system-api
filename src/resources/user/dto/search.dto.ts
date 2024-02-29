import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;
}
