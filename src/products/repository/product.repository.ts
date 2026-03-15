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

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
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
