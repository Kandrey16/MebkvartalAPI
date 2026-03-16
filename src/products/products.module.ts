import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsResolver } from './resolvers/products.resolver';
import { BrandResolver } from './resolvers/brand.resolver';
import { CollectionResolver } from './resolvers/collection.resolver';
import { ProductCollectionResolver } from './resolvers/product_collection.resolver';
import { ProductImageResolver } from './resolvers/product_image.resolver';
import { BrandService } from './services/brand.service';
import { CollectionService } from './services/collection.service';
import { ProductCollectionService } from './services/product_collection.service';
import { ProductImageService } from './services/product_image.service';
import { ProductRepository } from './repository/product.repository';
import { BrandRepository } from './repository/brand.repository';
import { CollectionRepository } from './repository/collection.repository';
import { ProductCollectionRepository } from './repository/product_collection.repository';
import { ProductImageRepository } from './repository/product_image.repository';

@Module({
  providers: [
    ProductRepository,
    BrandRepository,
    CollectionRepository,
    ProductCollectionRepository,
    ProductImageRepository,

    ProductsResolver,
    BrandResolver,
    CollectionResolver,
    ProductCollectionResolver,
    ProductImageResolver,

    ProductsService,
    BrandService,
    CollectionService,
    ProductCollectionService,
    ProductImageService,
  ],
})
export class ProductsModule {}
