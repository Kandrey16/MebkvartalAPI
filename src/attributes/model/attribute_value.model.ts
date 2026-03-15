import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AttributeValue {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  value: string;

  @Field(() => String)
  slug: string;

  @Field(() => Int)
  attributeId: number;
}
