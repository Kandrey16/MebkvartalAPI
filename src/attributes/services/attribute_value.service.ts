import { Injectable } from '@nestjs/common';
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

  async update(id: number, data: UpdateAttributeValueType) {
    return this.attributeValueRepository.update(id, data);
  }

  async remove(id: number) {
    return this.attributeValueRepository.remove(id);
  }
}
