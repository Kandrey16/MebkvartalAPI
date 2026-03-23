import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAttributeValueType,
  UpdateAttributeValueType,
} from '../schema/attribute_value.schema';
import { AttributeValueRepository } from '../repository/attribute_value.repository';
import { ParsedFilters } from 'src/utils/parseFilters';

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

  async filterByProductId(values: ParsedFilters) {
    const result =
      await this.attributeValueRepository.filterByProductId(values);

    if (!result.length) {
      throw new NotFoundException(
        `No products found for attribute values: ${JSON.stringify(values)}`,
      );
    }

    return result;
  }

  async findProductFacets(category: string) {
    if (!category) throw new NotFoundException('Category is required');
    return this.attributeValueRepository.findFacets(category);
  }

  async update(id: number, data: UpdateAttributeValueType) {
    return this.attributeValueRepository.update(id, data);
  }

  async remove(id: number) {
    return this.attributeValueRepository.remove(id);
  }
}
