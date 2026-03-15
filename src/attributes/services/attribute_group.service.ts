import { Injectable } from '@nestjs/common';
import {
  CreateAttributeGroupType,
  UpdateAttributeGroupType,
} from '../schema/attribute_group.schema';
import { AttributeGroupRepository } from '../repository/attribute_group.repository';

@Injectable()
export class AttributeGroupService {
  constructor(
    private readonly attributeGroupRepository: AttributeGroupRepository,
  ) {}

  async create(data: CreateAttributeGroupType) {
    return this.attributeGroupRepository.create(data);
  }

  async findAll() {
    return this.attributeGroupRepository.findAll();
  }

  async findOne(id: number) {
    return this.attributeGroupRepository.findOne(id);
  }

  async update(id: number, data: UpdateAttributeGroupType) {
    return this.attributeGroupRepository.update(id, data);
  }

  async remove(id: number) {
    return this.attributeGroupRepository.remove(id);
  }
}
