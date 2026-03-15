import { CreateProductInput } from './create-product.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => ID, { description: 'The ID of the product' })
  id: string;
}
