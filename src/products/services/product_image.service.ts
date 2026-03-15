import { Injectable } from '@nestjs/common';
import { ProductImageRepository } from '../repository/product_image.repository';
import {
  CreateProductImageType,
  UpdateProductImageType,
} from '../schema/product_image.schema';

@Injectable()
export class ProductImageService {
  constructor(
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async create(data: CreateProductImageType) {
    return this.productImageRepository.create(data);
  }

  async findAll() {
    return this.productImageRepository.findAll();
  }

  async findOne(id: string) {
    return this.productImageRepository.findOne(id);
  }

  async update(id: string, data: UpdateProductImageType) {
    return this.productImageRepository.update(id, data);
  }

  async remove(id: string) {
    return this.productImageRepository.remove(id);
  }
}
