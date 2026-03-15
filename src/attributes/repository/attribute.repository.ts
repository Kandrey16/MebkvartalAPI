import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateAttributeType,
  UpdateAttributeType,
} from '../schema/attribute.schema';

@Injectable()
export class AttributeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAttributeType) {
    return this.prisma.attribute.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.attribute.findMany();
  }

  async findOne(id: number) {
    return this.prisma.attribute.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAttributeType) {
    return this.prisma.attribute.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.attribute.delete({
      where: { id },
    });
  }
}
