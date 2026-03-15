import { Injectable } from '@nestjs/common';
import { ProductCollectionRepository } from '../repository/product_collection.repository';
import { CreateProductCollectionInput } from '../dto/product_collection/create-product_collection.input';
import { DeleteProductCollectionInput } from '../dto/product_collection/delete-product_collection.input';

@Injectable()
export class ProductCollectionService {
  constructor(
    private readonly productCollectionRepository: ProductCollectionRepository,
  ) {}

  async addProductToCollection(data: CreateProductCollectionInput) {
    return this.productCollectionRepository.create(data);
  }

  async removeProductFromCollection(data: DeleteProductCollectionInput) {
    return this.productCollectionRepository.remove(data);
  }
}
