import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryAttributeGroup {
  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  attributeGroupId: number;
}
