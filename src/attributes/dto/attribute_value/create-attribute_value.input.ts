import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAttributeValueInput {
  @Field(() => String)
  value: string;

  @Field(() => String)
  slug: string;

  @Field(() => Int)
  attributeId: number;
}
