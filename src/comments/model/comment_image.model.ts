import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentImage {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  commentId: number;
}
