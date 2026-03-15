import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  mark: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  productId: string;
}
