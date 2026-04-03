import { Injectable } from '@nestjs/common';
import { CreateProductInput } from '../dto/product/create-product.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductInput } from '../dto/product/update-product.input';
import { parseFilters } from 'src/utils/parseFilters';
import { Prisma } from '@prisma/client';
import { Product } from '../model/product.model';

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
    let where = Prisma.empty;

    if (categorySlug) {
      where = Prisma.sql`WHERE c.slug = ${categorySlug}`;
    }

    const conditions = Object.entries(parsedFilters).map(
      ([slug, values]) =>
        Prisma.sql`(a.slug = ${slug} AND av.slug = ANY(${values}))`,
    );

    return this.prisma.$queryRaw`
      SELECT DISTINCT
        p.id,
        p.name,
        p.slug,
        p.price,
        p.description,
        p.available_quantity AS "availableQuantity",
        p.is_active AS "isActive",
        p.brand_id AS "brandId",
        p.category_id AS "categoryId"
      FROM PRODUCTS p
      JOIN categories c ON c.id = p.category_id
      JOIN product_attribute_values pav ON p.id = pav.product_id
      JOIN attribute_values av ON av.id = pav.attribute_value_id
      JOIN attributes a ON a.id = av.attribute_id
      ${where}
      ${conditions.length > 0 ? Prisma.sql`AND (${Prisma.join(conditions, ' OR ')})` : Prisma.empty}
    `;
  }

  async countProductsWithParams(
    categorySlug?: string,
    filter?: string[],
  ): Promise<{ count: number }> {
    const parsedFilters = filter?.length ? parseFilters(filter) : {};
    let where = Prisma.empty;

    if (categorySlug) {
      where = Prisma.sql`WHERE c.slug = ${categorySlug}`;
    }

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
      ${where}
      ${conditions.length > 0 ? Prisma.sql`AND (${Prisma.join(conditions, ' OR ')})` : Prisma.empty}
    `;
  }

  async findOneBySlug(slug: string) {
    const query = await this.prisma.$queryRaw<Array<{ product: Product }>>`
      Select product from product_full_json 
      WHERE slug = ${slug}
    `;
    const result = query.map((r) => r.product);
    console.log(result[0].attributes);

    return result[0];
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
      include: {
        productImages: { orderBy: { position: 'asc' } },
      },
    });
  }
}
