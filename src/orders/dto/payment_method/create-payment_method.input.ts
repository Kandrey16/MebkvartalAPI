import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentMethodInput {
  @Field(() => String)
  name: string;
}
