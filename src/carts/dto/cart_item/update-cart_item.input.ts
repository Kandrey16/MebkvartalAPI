import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateCartItemInput } from './create-cart_item.input';

@InputType()
export class UpdateCartItemInput extends PartialType(CreateCartItemInput) {
  @Field(() => Int)
  id: number;
}
