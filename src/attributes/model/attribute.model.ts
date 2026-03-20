import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AttributeValue } from './attribute_value.model';

@ObjectType()
export class Attribute {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  attributeGroupId: number;

  @Field(() => [AttributeValue])
  values: AttributeValue[];
}
