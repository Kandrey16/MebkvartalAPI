import { Injectable } from '@nestjs/common';
import { CreateProductInput } from '../dto/product/create-product.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductInput } from '../dto/product/update-product.input';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductInput) {
    return this.prisma.product.create({
      data,
    });
  }

  async findAll(filter?: string[]) {
    return this.prisma.product.findMany({
      where: { id: filter ? { in: filter } : undefined },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async findByFilter(filter: string[]) {
    return this.prisma.product.findMany({
      where: { id: { in: filter } },
      select: { id: true },
      orderBy: { id: 'asc' },
      take: 20,
    });
  }

  async findByCategoryId(categoryId: number) {
    return this.prisma.product.findMany({
      where: { categoryId },
      select: { id: true },
    });
  }

  async update(id: string, data: UpdateProductInput) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
