import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { BaseFilterDto } from 'common/dto/base-filter.dto';

export class CarQueryDto extends BaseFilterDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'ID of the user being complainted',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  model_id?: number;
}
