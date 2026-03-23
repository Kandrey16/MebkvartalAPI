import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductType, UpdateProductType } from '../schema/product.schema';
import { ProductRepository } from '../repository/product.repository';
import { AttributeValueService } from 'src/attributes/services/attribute_value.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly attributeValueService: AttributeValueService,
  ) {}

  async create(data: CreateProductType) {
    return this.productRepository.create(data);
  }

  async findAll(categorySlug?: string, filter?: string[]) {
    if (!categorySlug) throw new Error('Category slug required');

    const [items, facetsCount, totalCount] = await Promise.all([
      this.productRepository.findProductsWithParams(categorySlug, filter),
      this.attributeValueService.findProductFacets(categorySlug),
      this.productRepository.countProductsWithParams(categorySlug, filter),
    ]);

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
      items,
      facets: Array.from(facetByAttributeId.values()),
      total: Number(totalCount[0].count),
    };
  }

  async findOne(id: string) {
    return this.productRepository.findOne(id);
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
