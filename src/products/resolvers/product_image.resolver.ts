import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductImage } from '../model/product_image.model';
import { ProductImageService } from '../services/product_image.service';
import { CreateProductImageInput } from '../dto/product_image/create-product_image.input';
import {
  ProductImageBaseSchema,
  UpdateProductImageSchema,
} from '../schema/product_image.schema';
import { UpdateProductImageInput } from '../dto/product_image/update-product_Image.input';

@Resolver(() => ProductImage)
export class ProductImageResolver {
  constructor(private readonly productImageService: ProductImageService) {}

  @Query(() => [ProductImage], { name: 'productImages' })
  findAll() {
    return this.productImageService.findAll();
  }

  @Query(() => ProductImage, { name: 'productImage', nullable: true })
  findOne(@Args('id', { type: () => Number }) id: string) {
    return this.productImageService.findOne(id);
  }

  @Mutation(() => ProductImage)
  createProductImage(@Args('input') input: CreateProductImageInput) {
    const data = ProductImageBaseSchema.parse(input);
    return this.productImageService.create(data);
  }

  @Mutation(() => ProductImage)
  updateProductImage(@Args('input') input: UpdateProductImageInput) {
    const data = UpdateProductImageSchema.parse(input);
    return this.productImageService.update(data.id, data);
  }

  @Mutation(() => ProductImage)
  removeProductImage(@Args('id', { type: () => ID }) id: string) {
    return this.productImageService.remove(id);
  }
}
