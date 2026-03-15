import { Injectable } from '@nestjs/common';
import { CreateProductAttributeValueType } from '../schema/product_attribute_value.schema';
import { ProductAttributeValueRepository } from '../repository/product_attribute_value.repository';

@Injectable()
export class ProductAttributeValueService {
  constructor(
    private readonly productAttributeValueRepository: ProductAttributeValueRepository,
  ) {}

  async create(data: CreateProductAttributeValueType) {
    return this.productAttributeValueRepository.create(data);
  }

  async findAll() {
    return this.productAttributeValueRepository.findAll();
  }

  async findOne(productId: string, attributeValueId: number) {
    return this.productAttributeValueRepository.findOne(
      productId,
      attributeValueId,
    );
  }

  async remove(productId: string, attributeValueId: number) {
    return this.productAttributeValueRepository.remove(
      productId,
      attributeValueId,
    );
  }
}
