import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field(() => ID)
  userId: string;
}
