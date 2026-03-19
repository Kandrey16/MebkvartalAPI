import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateProductImageType,
  UpdateProductImageType,
} from '../schema/product_image.schema';

@Injectable()
export class ProductImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductImageType) {
    return this.prisma.productImage.create({
      data,
    });
  }

  async findAll(filter?: string[]) {
    return this.prisma.productImage.findMany({
      where: { productId: filter ? { in: filter } : undefined, isMain: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.productImage.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateProductImageType) {
    return this.prisma.productImage.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.productImage.delete({
      where: { id },
    });
  }
}
