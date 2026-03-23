import { Injectable } from '@nestjs/common';
import { CreateProductInput } from '../dto/product/create-product.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductInput } from '../dto/product/update-product.input';
import { parseFilters } from 'src/utils/parseFilters';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductInput) {
    return this.prisma.product.create({
      data,
    });
  }

  async findProductsWithParams(categorySlug?: string, filter?: string[]) {
    const parsedFilters = filter?.length ? parseFilters(filter) : {};

    if (!categorySlug) throw new Error('categorySlug required');

    const conditions = Object.entries(parsedFilters).map(
      ([slug, values]) =>
        Prisma.sql`(a.slug = ${slug} AND av.slug = ANY(${values}))`,
    );

    return this.prisma.$queryRaw`
      SELECT DISTINCT
      p.id, p.name, p.slug, p.price, p.description
      FROM PRODUCTS p
      JOIN categories c ON c.id = p.category_id
      JOIN product_attribute_values pav ON p.id = pav.product_id
      JOIN attribute_values av ON av.id = pav.attribute_value_id
      JOIN attributes a ON a.id = av.attribute_id
      WHERE c.slug = ${categorySlug}
      ${conditions.length > 0 ? Prisma.sql`AND (${Prisma.join(conditions, ' OR ')})` : Prisma.empty}
    `;
  }

  async countProductsWithParams(
    categorySlug?: string,
    filter?: string[],
  ): Promise<{ count: number }> {
    const parsedFilters = filter?.length ? parseFilters(filter) : {};

    if (!categorySlug) throw new Error('categorySlug required');

    const conditions = Object.entries(parsedFilters).map(
      ([slug, values]) =>
        Prisma.sql`(a.slug = ${slug} AND av.slug = ANY(${values}))`,
    );

    return this.prisma.$queryRaw`
      SELECT COUNT(DISTINCT p.id) as count
      FROM PRODUCTS p
      JOIN categories c ON c.id = p.category_id
      JOIN product_attribute_values pav ON p.id = pav.product_id
      JOIN attribute_values av ON av.id = pav.attribute_value_id
      JOIN attributes a ON a.id = av.attribute_id
      WHERE c.slug = ${categorySlug}
      ${conditions.length > 0 ? Prisma.sql`AND (${Prisma.join(conditions, ' OR ')})` : Prisma.empty}
    `;
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async findByFilter(filter: string[]) {
    return this.prisma.product.findMany({
      where: { id: { in: filter } },
      select: { id: true },
      orderBy: { id: 'asc' },
      take: 20,
    });
  }

  async findByCategoryId(categoryId: number) {
    return this.prisma.product.findMany({
      where: { categoryId },
      select: { id: true },
    });
  }

  async update(id: string, data: UpdateProductInput) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
