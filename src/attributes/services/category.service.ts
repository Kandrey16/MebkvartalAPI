import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import {
  CreateCategoryType,
  UpdateCategoryType,
} from '../schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(data: CreateCategoryType) {
    return this.categoryRepository.create(data);
  }

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }

  async findIdBySlug(slug: string) {
    const data = await this.categoryRepository.findBySlug(slug);

    if (!data) {
      throw new NotFoundException(`Category with slug ${slug} not found`);
    }

    return data.id;
  }

  async update(id: number, data: UpdateCategoryType) {
    return this.categoryRepository.update(id, data);
  }

  async remove(id: number) {
    return this.categoryRepository.remove(id);
  }
}
