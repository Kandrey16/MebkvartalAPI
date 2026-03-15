import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Cart {
  @Field(() => Int)
  id: number;

  @Field(() => ID)
  userId: string;
}
