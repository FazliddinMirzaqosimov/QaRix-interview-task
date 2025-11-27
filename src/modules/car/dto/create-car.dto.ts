import { IsInt, IsString, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ description: 'ID of the car model', example: 2 })
  @IsInt()
  model_id: number;

  @ApiProperty({ description: 'Year of the car', example: 2020 })
  @IsInt()
  @Min(1800)
  year: number;

  @ApiPropertyOptional({ description: "Owner's name" })
  @IsOptional()
  @IsString()
  ownerName?: string;
}
