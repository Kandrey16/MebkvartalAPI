import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => Int)
  mark: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  productId: string;
}
