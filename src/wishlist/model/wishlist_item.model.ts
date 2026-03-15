import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WishlistItem {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  productId: string;
}
