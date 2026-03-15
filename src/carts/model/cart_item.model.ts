import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CartItem {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  cartId: number;
}
