import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAttributeValueType,
  UpdateAttributeValueType,
} from '../schema/attribute_value.schema';
import { AttributeValueRepository } from '../repository/attribute_value.repository';

@Injectable()
export class AttributeValueService {
  constructor(
    private readonly attributeValueRepository: AttributeValueRepository,
  ) {}

  async create(data: CreateAttributeValueType) {
    return this.attributeValueRepository.create(data);
  }

  async findAll() {
    return this.attributeValueRepository.findAll();
  }

  async findOne(id: number) {
    return this.attributeValueRepository.findOne(id);
  }

  async findBySlug(filters: string[]) {
    const values = await this.attributeValueRepository.findBuSlug(filters);

    if (!values.length) {
      throw new NotFoundException(
        `No attribute values found for filters: ${filters.join(', ')}`,
      );
    }

    return values.map((value) => value.id);
  }

  async filterByProductId(values: number[]) {
    const result =
      await this.attributeValueRepository.filterByProductId(values);

    if (!result.length) {
      throw new NotFoundException(
        `No products found with attribute values: ${values.join(', ')}`,
      );
    }

    return result.map((item) => item.product_id);
  }

  async findProductFacets(values: string[]) {
    const result =
      await this.attributeValueRepository.findProductFacets(values);
    if (!result.length) {
      throw new NotFoundException(
        `No facets found for products with attribute values: ${values.join(', ')}`,
      );
    }

    return result;
  }

  async update(id: number, data: UpdateAttributeValueType) {
    return this.attributeValueRepository.update(id, data);
  }

  async remove(id: number) {
    return this.attributeValueRepository.remove(id);
  }
}
