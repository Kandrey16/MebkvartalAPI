import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateProductImageInput } from './create-product_image.input';

@InputType()
export class UpdateProductImageInput extends PartialType(
  CreateProductImageInput,
) {
  @Field(() => ID, { description: 'The ID of the product image' })
  id: string;
}
