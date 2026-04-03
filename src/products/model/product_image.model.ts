import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductImage {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  position: number;

  @Field(() => Boolean)
  isMain: boolean;

  @Field(() => ID)
  productId: string;
}
