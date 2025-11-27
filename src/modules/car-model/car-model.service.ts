import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CarModelQueryDto } from './dto/car-model-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CarModelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCarModelDto: CreateCarModelDto) {
   
    const existingModel = await this.prisma.carModel.findUnique({
      where: { name: createCarModelDto.name },
    });
    if (existingModel) {
      throw new BadRequestException(`CarModel with name ${createCarModelDto.name} already exists`);
    }
   
    return this.prisma.carModel.create({
      data: createCarModelDto,
    });
  }

  async findAll(query: CarModelQueryDto) {
    const where: Prisma.CarModelWhereInput = {};

    if (query.s) {
      where.OR = [{ name: { contains: query.s } }];
    }

    const [results, total] = await Promise.all([
      this.prisma.carModel.findMany({
        where,
        skip: query.offset,
        take: query.limit,
        orderBy: { [query.orderBy]: query.order },
      }),
      this.prisma.carModel.count({ where }),
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

  async findById(id: number) {
    const carModel = await this.prisma.carModel.findUnique({
      where: { id },
    });

    if (!carModel) {
      throw new NotFoundException(`CarModel with ID ${id} not found`);
    }

    return carModel;
  }

  async update(id: number, updateCarModelDto: UpdateCarModelDto) {
    await this.findById(id);

    return this.prisma.carModel.update({
      where: { id },
      data: updateCarModelDto,
    });
  }

  async remove(id: number) {
    await this.findById(id);

    await this.prisma.carModel.delete({
      where: { id },
    });

    return {
      status: 'success',
    };
  }
}
