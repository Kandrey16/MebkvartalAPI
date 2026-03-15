import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteWishlistItemInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  productId: string;
}
