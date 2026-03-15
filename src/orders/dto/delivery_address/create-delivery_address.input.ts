import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDeliveryAddressInput {
  @Field(() => String)
  address: string;

  @Field({ nullable: true })
  entrance?: string;

  @Field({ nullable: true })
  floor?: string;

  @Field({ nullable: true })
  intercom?: string;

  @Field(() => ID)
  userId: string;
}
