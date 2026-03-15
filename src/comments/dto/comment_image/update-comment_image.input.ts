import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateCommentImageInput } from './create-comment_image.input';

@InputType()
export class UpdateCommentImageInput extends PartialType(
  CreateCommentImageInput,
) {
  @Field(() => Int)
  id: number;
}
