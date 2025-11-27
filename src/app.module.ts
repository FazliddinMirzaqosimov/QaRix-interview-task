import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './modules/car/car.module';
import { CarModelModule } from './modules/car-model/car-model.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // now ConfigService is available anywhere
    }),
    CarModule,
    CarModelModule,
    PrismaModule,
  ],
})
export class AppModule {}
