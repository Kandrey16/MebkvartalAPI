import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeliveryMethod {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;
}
