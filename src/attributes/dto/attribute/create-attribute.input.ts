import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAttributeInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  attributeGroupId: number;
}
