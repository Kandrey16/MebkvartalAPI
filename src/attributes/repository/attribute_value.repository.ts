import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateAttributeValueType,
  UpdateAttributeValueType,
} from '../schema/attribute_value.schema';

@Injectable()
export class AttributeValueRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAttributeValueType) {
    return this.prisma.attributeValue.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.attributeValue.findMany();
  }

  async findOne(id: number) {
    return this.prisma.attributeValue.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAttributeValueType) {
    return this.prisma.attributeValue.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.attributeValue.delete({
      where: { id },
    });
  }
}
