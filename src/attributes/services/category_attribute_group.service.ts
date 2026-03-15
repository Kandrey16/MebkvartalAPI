import { Injectable } from '@nestjs/common';
import { CreateCategoryAttributeGroupType } from '../schema/category_attribute_group.schema';
import { CategoryAttributeGroupRepository } from '../repository/category_attribute_group.repository';

@Injectable()
export class CategoryAttributeGroupService {
  constructor(
    private readonly categoryAttributeGroupRepository: CategoryAttributeGroupRepository,
  ) {}

  async create(data: CreateCategoryAttributeGroupType) {
    return this.categoryAttributeGroupRepository.create(data);
  }

  async findAll() {
    return this.categoryAttributeGroupRepository.findAll();
  }

  async findOne(categoryId: number, attributeGroupId: number) {
    return this.categoryAttributeGroupRepository.findOne(
      categoryId,
      attributeGroupId,
    );
  }

  async remove(categoryId: number, attributeGroupId: number) {
    return this.categoryAttributeGroupRepository.remove(
      categoryId,
      attributeGroupId,
    );
  }
}
