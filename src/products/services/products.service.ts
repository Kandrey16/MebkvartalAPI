import { Injectable } from '@nestjs/common';
import { CreateProductType, UpdateProductType } from '../schema/product.schema';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(data: CreateProductType) {
    return this.productRepository.create(data);
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  async findOne(id: string) {
    return this.productRepository.findOne(id);
  }

  async update(id: string, data: UpdateProductType) {
    return this.productRepository.update(id, data);
  }

  async remove(id: string) {
    return this.productRepository.remove(id);
  }
}
