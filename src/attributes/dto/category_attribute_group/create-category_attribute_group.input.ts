import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryAttributeGroupInput {
  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  attributeGroupId: number;
}
