import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Attribute {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  attributeGroupId: number;
}
