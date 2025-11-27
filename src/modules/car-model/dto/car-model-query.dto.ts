import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseFilterDto } from 'common/dto/base-filter.dto';

export class CarModelQueryDto extends BaseFilterDto {
  // In here we can add specific query parameters for car models if it is neccessary
}
