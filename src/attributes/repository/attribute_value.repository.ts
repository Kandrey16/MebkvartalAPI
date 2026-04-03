import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  CreateAttributeValueType,
  UpdateAttributeValueType,
} from '../schema/attribute_value.schema';
import { ParsedFilters } from 'src/utils/parseFilters';

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

  async findBuSlug(filters: string[]) {
    return this.prisma.attributeValue.findMany({
      where: { slug: { in: filters } },
      select: {
        id: true,
        slug: true,
      },
    });
  }

  async filterByProductId(values: ParsedFilters): Promise<string[]> {
    const filterCount = Object.keys(values).length;

    const conditions = Object.entries(values).map(
      ([attr, values]) =>
        Prisma.sql`(a.slug = ${attr} AND av.slug IN (${Prisma.join(values)}))`,
    );

    const whereCause = Prisma.join(conditions, ' OR ');
    const query = await this.prisma.$queryRaw<{ product_id: string }[]>`
      SELECT pav.product_id
      FROM product_attribute_values pav
      JOIN attribute_values av ON av.id = pav.attribute_value_id
      JOIN attributes a ON a.id = av.attribute_id
      JOIN attribute_groups ag ON ag.id = a.attribute_group_id
      WHERE ${whereCause}
      GROUP BY pav.product_id
      HAVING COUNT(DISTINCT a.name) = ${filterCount}  
    `;

    const result = query.map((row) => row.product_id);
    return result;
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

  async findFacets(categorySlug?: string): Promise<
    Array<{
      id: number | string;
      name: string;
      value: string;
      count: string | number;
    }>
  > {
    let where = Prisma.empty;

    if (categorySlug) {
      where = Prisma.sql`WHERE c.slug = ${categorySlug}`;
    }

    return this.prisma.$queryRaw`
      SELECT
      a.id,
      a.name,
      av.value,
      COUNT(DISTINCT p.id) as count
      FROM Attributes a
      JOIN Attribute_values av ON a.id = av.attribute_id
      JOIN product_attribute_values pav ON av.id = pav.attribute_value_id
      JOIN Products p ON p.id = pav.product_id
      JOIN Categories c ON c.id = p.category_id
      ${where}
      GROUP BY a.id, a.name, av.value
      ORDER BY a.id
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
