import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentImageInput {
  @Field(() => String)
  url: string;

  @Field(() => Int)
  commentId: number;
}
