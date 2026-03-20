import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductsService } from '../services/products.service';
import { CreateProductInput } from '../dto/product/create-product.input';
import { UpdateProductInput } from '../dto/product/update-product.input';
import { FacetProduct, Product } from '../model/product.model';
import {
  ProductBaseSchema,
  UpdateProductSchema,
} from '../schema/product.schema';
import { Public } from 'src/auth/decopators/public.decorator';
import { ProductFilterInput } from '../dto/product/filter.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Query(() => FacetProduct, { name: 'products' })
  findAll(
    @Args('category', { type: () => String, nullable: true })
    categorySlug?: string,
    @Args('filters', { nullable: true }) filter?: ProductFilterInput,
  ) {
    return this.productsService.findAll(categorySlug, filter?.filters);
  }

  @Public()
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
