import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductAttributeValueType } from '../schema/product_attribute_value.schema';

@Injectable()
export class ProductAttributeValueRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductAttributeValueType) {
    return this.prisma.productAttributeValue.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.productAttributeValue.findMany();
  }

  async findOne(productId: string, attributeValueId: number) {
    return this.prisma.productAttributeValue.findUnique({
      where: {
        productId_attributeValueId: { productId, attributeValueId },
      },
    });
  }

  async remove(productId: string, attributeValueId: number) {
    return this.prisma.productAttributeValue.delete({
      where: {
        productId_attributeValueId: { productId, attributeValueId },
      },
    });
  }
}
