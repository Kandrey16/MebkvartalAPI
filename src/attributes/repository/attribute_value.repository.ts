import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
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

  async findBuSlug(slugs: string[]) {
    return this.prisma.attributeValue.findMany({
      where: { slug: { in: slugs } },
      select: {
        id: true,
        slug: true,
      },
    });
  }

  async filterByProductId(values: number[]) {
    return this.prisma.$queryRaw<Array<{ product_id: string }>>`
      SELECT product_id
      FROM product_attribute_values
      WHERE attribute_value_id IN (${values.join(',')})
      GROUP BY product_id
      HAVING COUNT(DISTINCT attribute_value_id) = ${values.length}
    `;
  }

  async facetsCount(values: string[]) {
    return this.prisma.$queryRaw<Array<{ count: number }>>`
      SELECT 
        av.attribute_id,
        av.id as value_id,
        COUNT(DISTINCT pav.product_id) as count
      FROM product_attribute_values pav
      JOIN attribute_values av ON av.id = pav.attribute_value_id
        ON av.id = pav.attribute_value_id
      WHERE pav.product_id IN (${values.join(',')})
      GROUP BY av.attribute_id, av.id
    `;
  }

  async findProductFacets(productIds: string[]) {
    return this.prisma.$queryRaw<
      Array<{
        id: number;
        name: string;
        value: string;
        count: bigint | number;
      }>
    >`
      SELECT
        ag.id AS "id",
        ag.name AS "name",
        av.value AS "value",
        COUNT(DISTINCT pav.product_id) AS count
      FROM product_attribute_values pav
      JOIN attribute_values av ON av.id = pav.attribute_value_id
      JOIN attributes a ON a.id = av.attribute_id
      JOIN attribute_groups ag ON ag.id = a.attribute_group_id
      WHERE pav.product_id IN (${Prisma.join(productIds)})
      GROUP BY ag.id, ag.name, av.value
      ORDER BY ag.name, "count" DESC
    `;
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
