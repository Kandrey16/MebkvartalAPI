import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandType, UpdateBrandType } from '../schema/brand.schema';

@Injectable()
export class BrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBrandType) {
    return this.prisma.brand.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.brand.findMany();
  }

  async findOne(id: number) {
    return this.prisma.brand.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateBrandType) {
    return this.prisma.brand.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.brand.delete({
      where: { id },
    });
  }
}
