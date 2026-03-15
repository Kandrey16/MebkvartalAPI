import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

ObjectType();
export class ProductImage {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  position: number;

  @Field(() => Boolean)
  is_main: boolean;

  @Field(() => ID)
  product_id: string;
}
