import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateProductCollectionType,
  DeleteProductCollectionType,
} from '../schema/product_collection.schema';

@Injectable()
export class ProductCollectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductCollectionType) {
    return this.prisma.productCollection.create({
      data,
    });
  }

  async remove(data: DeleteProductCollectionType) {
    return this.prisma.productCollection.delete({
      where: {
        productId_collectionId: {
          productId: data.productId,
          collectionId: data.collectionId,
        },
      },
    });
  }
}
