import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateAttributeGroupType,
  UpdateAttributeGroupType,
} from '../schema/attribute_group.schema';
import { convertToSlug } from 'src/utils/convertToSlug';

@Injectable()
export class AttributeGroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAttributeGroupType) {
    return this.prisma.attributeGroup.create({
      data: {
        ...data,
        slug: convertToSlug(data.name),
      },
    });
  }

  async findAll() {
    return this.prisma.attributeGroup.findMany();
  }

  async findOne(id: number) {
    return this.prisma.attributeGroup.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAttributeGroupType) {
    return this.prisma.attributeGroup.update({
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
    return this.prisma.attributeGroup.delete({
      where: { id },
    });
  }
}
