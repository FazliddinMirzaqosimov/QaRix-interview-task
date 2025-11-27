import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  IsIn,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseFilterDto {
  @ApiPropertyOptional({ description: 'Search string', minLength: 2 })
  @IsOptional()
  @IsString()
  @MinLength(2)
  s?: string;

  @ApiPropertyOptional({ description: 'Limit of items', default: 10, minimum: 0, type: Number })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Offset for pagination', default: 0, minimum: 0, type: Number })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @ApiPropertyOptional({ description: 'Order by field', default: 'createdAt' })
  @IsOptional()
  @IsString()
  orderBy: string = 'createdAt';

  @ApiPropertyOptional({ description: 'Order direction', enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'desc';
}
