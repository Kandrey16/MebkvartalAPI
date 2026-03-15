import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteCategoryAttributeGroupInput {
  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  attributeGroupId: number;
}
