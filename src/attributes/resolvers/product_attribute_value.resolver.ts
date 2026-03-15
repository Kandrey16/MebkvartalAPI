import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductAttributeValueService } from '../services/product_attribute_value.service';
import { ProductAttributeValue } from '../model/product_attribute_value.model';
import { CreateProductAttributeValueInput } from '../dto/product_attribute_value/create-product_attribute_value.input';
import { DeleteProductAttributeValueInput } from '../dto/product_attribute_value/delete-product_attribute_value.input';
import {
  ProductAttributeValueBaseSchema,
  DeleteProductAttributeValueSchema,
} from '../schema/product_attribute_value.schema';

@Resolver(() => ProductAttributeValue)
export class ProductAttributeValueResolver {
  constructor(
    private readonly productAttributeValueService: ProductAttributeValueService,
  ) {}

  @Query(() => [ProductAttributeValue], { name: 'productAttributeValues' })
  findAll() {
    return this.productAttributeValueService.findAll();
  }

  @Query(() => ProductAttributeValue, {
    name: 'productAttributeValue',
    nullable: true,
  })
  findOne(
    @Args('productId', { type: () => ID }) productId: string,
    @Args('attributeValueId', { type: () => Int }) attributeValueId: number,
  ) {
    return this.productAttributeValueService.findOne(
      productId,
      attributeValueId,
    );
  }

  @Mutation(() => ProductAttributeValue)
  createProductAttributeValue(
    @Args('input') input: CreateProductAttributeValueInput,
  ) {
    const data = ProductAttributeValueBaseSchema.parse(input);
    return this.productAttributeValueService.create(data);
  }

  @Mutation(() => ProductAttributeValue)
  removeProductAttributeValue(
    @Args('input') input: DeleteProductAttributeValueInput,
  ) {
    const data = DeleteProductAttributeValueSchema.parse(input);
    return this.productAttributeValueService.remove(
      data.productId,
      data.attributeValueId,
    );
  }
}
