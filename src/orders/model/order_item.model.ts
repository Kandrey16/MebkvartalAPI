import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {
  @Field(() => Int)
  id: number;

  @Field(() => ID)
  orderId: string;

  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}
