import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductType, UpdateProductType } from '../schema/product.schema';
import { ProductRepository } from '../repository/product.repository';
import { CategoryService } from 'src/attributes/services/category.service';
import { AttributeValueService } from 'src/attributes/services/attribute_value.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly attributeValueService: AttributeValueService,
  ) {}

  async create(data: CreateProductType) {
    return this.productRepository.create(data);
  }

  async findAll(categorySlug?: string, filter?: string[]) {
    let scopedProductIds: string[] | undefined;

    if (categorySlug) {
      // 1) Ограничиваем выдачу по категории
      const categoryId = await this.categoryService.findIdBySlug(categorySlug);
      const res = await this.productRepository.findByCategoryId(categoryId);
      scopedProductIds = res.map((item) => item.id);

      if (!scopedProductIds.length) {
        return { items: [], facets: [] };
      }
    }

    if (filter?.length) {
      // 2) Один запрос на получение id значений атрибутов
      const attributeIds = await this.attributeValueService.findBySlug(filter);
      const productsByAttributes =
        await this.attributeValueService.filterByProductId(attributeIds);

      if (!productsByAttributes.length) {
        return { items: [], facets: [] };
      }

      // 3) Если есть категория, берём пересечение множеств
      const scopedSet = scopedProductIds ? new Set(scopedProductIds) : null;

      const finalProductIds = scopedSet
        ? productsByAttributes.filter((id) => scopedSet.has(id))
        : productsByAttributes;

      if (!finalProductIds.length) {
        return { items: [], facets: [] };
      }

      const [result, facetsCount] = await Promise.all([
        this.productRepository.findAll(finalProductIds),
        this.attributeValueService.findProductFacets(finalProductIds),
      ]);

      return {
        items: result,

        facets: facetsCount.map((facet) => ({
          id: facet.id,

          name: facet.name,

          value: facet.value,

          count: Number(facet.count),
        })),
      };
    }

    const items = await this.productRepository.findAll(scopedProductIds);

    return {
      items,

      facets: [],
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
