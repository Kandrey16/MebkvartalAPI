import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAttributeGroupInput {
  @Field(() => String)
  name: string;
}
