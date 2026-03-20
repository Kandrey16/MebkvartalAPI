import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Attribute } from './attribute.model';

@ObjectType()
export class AttributeGroup {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Attribute])
  attributes: Attribute[];
}
