import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarModelModule } from 'modules/car-model/car-model.module';

@Module({
  imports: [CarModelModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
