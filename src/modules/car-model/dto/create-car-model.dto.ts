import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCarModelDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'Name of the model',example: 'Model S' })
  name: string;
}
