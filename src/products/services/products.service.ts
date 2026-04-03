import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductType, UpdateProductType } from '../schema/product.schema';
import { ProductRepository } from '../repository/product.repository';
import { ProductImageRepository } from '../repository/product_image.repository';
import { AttributeValueService } from 'src/attributes/services/attribute_value.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productImageRepository: ProductImageRepository,
    private readonly attributeValueService: AttributeValueService,
  ) {}

  async create(data: CreateProductType) {
    return this.productRepository.create(data);
  }

  async findAll(categorySlug?: string, filter?: string[]) {
    const [items, facetsCount, totalCount] = await Promise.all([
      this.productRepository.findProductsWithParams(categorySlug, filter),
      this.attributeValueService.findProductFacets(categorySlug),
      this.productRepository.countProductsWithParams(categorySlug, filter),
    ]);

    const productIds = (items as { id: string }[]).map((p) => p.id);
    const images =
      await this.productImageRepository.findByProductIds(productIds);
    const imagesByProductId = new Map<string, typeof images>();
    for (const img of images) {
      const list = imagesByProductId.get(img.productId);
      if (list) {
        list.push(img);
      } else {
        imagesByProductId.set(img.productId, [img]);
      }
    }

    const itemsWithImages = (items as Record<string, unknown>[]).map((p) => ({
      ...p,
      productImages: imagesByProductId.get(p.id as string) ?? [],
    }));

    const facetByAttributeId = new Map();

    for (const row of facetsCount) {
      if (!facetByAttributeId.has(row.id)) {
        facetByAttributeId.set(row.id, {
          id: row.id,
          attribute: row.name,
          values: [],
        });
      }

      facetByAttributeId.get(row.id).values.push({
        value: row.value,
        count: Number(row.count),
      });
    }

    return {
      items: itemsWithImages,
      facets: Array.from(facetByAttributeId.values()),
      total: Number(totalCount[0].count),
    };
  }

  async findOneBySlug(slug: string) {
    return this.productRepository.findOneBySlug(slug);
  }

  async findIdByCategoryId(categoryId: number) {
    const products = await this.productRepository.findByCategoryId(categoryId);

    if (!products.length) {
      throw new NotFoundException(
        `Products with categoryId ${categoryId} not found`,
      );
    }

    return products.map((product) => product.id);
  }

  async update(id: string, data: UpdateProductType) {
    return this.productRepository.update(id, data);
  }

  async remove(id: string) {
    return this.productRepository.remove(id);
  }
}
