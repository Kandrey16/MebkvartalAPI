import { Injectable } from '@nestjs/common';
import {
  CreateAttributeType,
  UpdateAttributeType,
} from '../schema/attribute.schema';
import { AttributeRepository } from '../repository/attribute.repository';

@Injectable()
export class AttributeService {
  constructor(private readonly attributeRepository: AttributeRepository) {}

  async create(data: CreateAttributeType) {
    return this.attributeRepository.create(data);
  }

  async findAll() {
    return this.attributeRepository.findAll();
  }

  async findOne(id: number) {
    return this.attributeRepository.findOne(id);
  }

  async update(id: number, data: UpdateAttributeType) {
    return this.attributeRepository.update(id, data);
  }

  async remove(id: number) {
    return this.attributeRepository.remove(id);
  }
}
