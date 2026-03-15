import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeliveryAddress {
  @Field(() => Int)
  id: number;

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
