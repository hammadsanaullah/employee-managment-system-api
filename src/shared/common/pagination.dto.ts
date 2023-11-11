import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class PaginationDto implements IPaginationOptions {
  constructor() {
    this.limit = 100; //too set default value
    this.page = 1; //too set default value
  }

  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    default: 100,
    example: 10,
    description: 'items per page',
  })
  limit: string | number;

  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    default: 1,
    example: 1,
    description: 'page number you want to paginate',
  })
  page: string | number;
}
