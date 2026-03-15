import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateOrderItemInput } from './create-order_item.input';

@InputType()
export class UpdateOrderItemInput extends PartialType(CreateOrderItemInput) {
  @Field(() => Int)
  id: number;
}
