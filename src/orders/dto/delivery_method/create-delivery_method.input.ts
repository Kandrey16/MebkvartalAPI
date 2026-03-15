import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDeliveryMethodInput {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;
}
