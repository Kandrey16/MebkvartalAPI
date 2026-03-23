import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateAttributeType,
  UpdateAttributeType,
} from '../schema/attribute.schema';
import { convertToSlug } from 'src/utils/convertToSlug';

@Injectable()
export class AttributeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAttributeType) {
    return this.prisma.attribute.create({
      data: {
        ...data,
        slug: convertToSlug(data.name),
      },
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
      data: data.name
        ? {
            ...data,
            slug: convertToSlug(data.name),
          }
        : data,
    });
  }

  async remove(id: number) {
    return this.prisma.attribute.delete({
      where: { id },
    });
  }
}
