import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCartItemInput {
  @Field(() => Int)
  quantity: number;

  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  cartId: number;
}
