import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CarQueryDto } from './dto/car-query.dto';
import { CarModelService } from 'modules/car-model/car-model.service';
import * as QRCode from 'qrcode';
import { BASE_URL } from 'common/config/env';

@Injectable()
export class CarService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly carModelService: CarModelService,
  ) {}

  async create(createCarDto: CreateCarDto) {
    await this.carModelService.findById(createCarDto.model_id);

    const vin = await this.generateNewVin();

    return this.prisma.car.create({
      data: { ...createCarDto, vin: vin },
    });
  }

  async findAll(query: CarQueryDto) {
    const where: Prisma.CarWhereInput = {
      model_id: query.model_id,
    };

    if (query.s) {
      where.OR = [
        { ownerName: { contains: query.s } },
        { vin: { contains: query.s } },
      ];
    }

    const [results, total] = await Promise.all([
      this.prisma.car.findMany({
        where,
        skip: query.offset,
        take: query.limit,
        orderBy: { [query.orderBy]: query.order },
      }),
      this.prisma.car.count({ where }),
    ]);

    return {
      meta: {
        offset: query.offset,
        limit: query.limit,
        total,
      },
      results,
    };
  }

  // This function is for algorithm of new VIN generation logic
  async generateNewVin() {
    // Here you can implement your logic to generate a newVin
    const newVin = Math.random().toString(36).substring(2, 15).toUpperCase();

    return newVin;
  }

  async generateQr(carId: number): Promise<string> {
    const car = await this.findById(carId);

    const qrBase64 = await QRCode.toDataURL(`${BASE_URL}/api/car/${car.id}`);

    return qrBase64;
  }

  async findById(id: number) {
    const car = await this.prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    await this.findById(id);

    return this.prisma.car.update({
      where: { id },
      data: updateCarDto,
    });
  }

  async remove(id: number) {
    await this.findById(id);

    await this.prisma.car.delete({
      where: { id },
    });

    return {
      status: 'success',
    };
  }
}
