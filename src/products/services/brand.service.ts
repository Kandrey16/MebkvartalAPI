import { Injectable } from '@nestjs/common';
import { BrandRepository } from '../repository/brand.repository';
import { CreateBrandType, UpdateBrandType } from '../schema/brand.schema';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async create(data: CreateBrandType) {
    return this.brandRepository.create(data);
  }

  async findAll() {
    return this.brandRepository.findAll();
  }

  async findOne(id: number) {
    return this.brandRepository.findOne(id);
  }

  async update(id: number, data: UpdateBrandType) {
    return this.brandRepository.update(id, data);
  }

  async remove(id: number) {
    return this.brandRepository.remove(id);
  }
}
