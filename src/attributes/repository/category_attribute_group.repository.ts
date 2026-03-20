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

  async findAll(categoryId?: number) {
    const where = categoryId ? { categoryId } : undefined;
    const rows = await this.prisma.categoryAttributeGroup.findMany({
      where,
      include: {
        category: true,
        attribute_group: {
          include: {
            attributes: {
              include: {
                values: true,
              },
            },
          },
        },
      },
    });

    // Prisma отдаёт relation-сущность как `attribute_group`, а GraphQL модель ждёт `attributeGroup`.
    return rows.map((row) => ({
      ...row,
      attributeGroup: row.attribute_group,
    }));
  }

  async findOne(categoryId: number, attributeGroupId: number) {
    const row = await this.prisma.categoryAttributeGroup.findUnique({
      where: {
        categoryId_attributeGroupId: { categoryId, attributeGroupId },
      },
      include: {
        category: true,
        attribute_group: {
          include: {
            attributes: {
              include: {
                values: true,
              },
            },
          },
        },
      },
    });

    if (!row) return null;

    return {
      ...row,
      attributeGroup: row.attribute_group,
    };
  }

  async remove(categoryId: number, attributeGroupId: number) {
    return this.prisma.categoryAttributeGroup.delete({
      where: {
        categoryId_attributeGroupId: { categoryId, attributeGroupId },
      },
    });
  }
}
