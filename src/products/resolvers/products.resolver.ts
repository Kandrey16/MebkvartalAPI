import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductsService } from '../services/products.service';
import { CreateProductInput } from '../dto/product/create-product.input';
import { UpdateProductInput } from '../dto/product/update-product.input';
import { Product } from '../model/product.model';
import {
  ProductBaseSchema,
  UpdateProductSchema,
} from '../schema/product.schema';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput) {
    const data = ProductBaseSchema.parse(input);
    return this.productsService.create(data);
  }

  @Mutation(() => Product)
  updateProduct(@Args('input') input: UpdateProductInput) {
    const data = UpdateProductSchema.parse(input);
    return this.productsService.update(data.id, data);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.remove(id);
  }
}
