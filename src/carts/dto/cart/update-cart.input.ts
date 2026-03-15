import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateCartInput } from './create-cart.input';

@InputType()
export class UpdateCartInput extends PartialType(CreateCartInput) {
  @Field(() => Int)
  id: number;
}
