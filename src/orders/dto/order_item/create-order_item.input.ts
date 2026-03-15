import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
  @Field(() => ID)
  orderId: string;

  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}
