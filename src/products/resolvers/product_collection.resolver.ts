import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCollection } from '../model/product_collection.model';
import { ProductCollectionService } from '../services/product_collection.service';
import { CreateProductCollectionInput } from '../dto/product_collection/create-product_collection.input';
import { DeleteProductCollectionInput } from '../dto/product_collection/delete-product_collection.input';

@Resolver(() => ProductCollection)
export class ProductCollectionResolver {
  constructor(
    private readonly productCollectionService: ProductCollectionService,
  ) {}

  @Mutation(() => ProductCollection)
  addProductToCollection(@Args('input') input: CreateProductCollectionInput) {
    return this.productCollectionService.addProductToCollection(input);
  }

  @Mutation(() => ProductCollection)
  removeProductFromCollection(
    @Args('input') input: DeleteProductCollectionInput,
  ) {
    return this.productCollectionService.removeProductFromCollection(input);
  }
}
