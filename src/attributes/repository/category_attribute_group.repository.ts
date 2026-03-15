import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryAttributeGroupType } from '../schema/category_attribute_group.schema';

@Injectable()
export class CategoryAttributeGroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryAttributeGroupType) {
    return this.prisma.categoryAttributeGroup.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.categoryAttributeGroup.findMany();
  }
  //TODO: getType
  async findOne(categoryId: number, attributeGroupId: number) {
    return this.prisma.categoryAttributeGroup.findUnique({
      where: {
        categoryId_attributeGroupId: { categoryId, attributeGroupId },
      },
    });
  }
  //TODO: deleteType

  async remove(categoryId: number, attributeGroupId: number) {
    return this.prisma.categoryAttributeGroup.delete({
      where: {
        categoryId_attributeGroupId: { categoryId, attributeGroupId },
      },
    });
  }
}
