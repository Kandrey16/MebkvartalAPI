import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductCollection {
  @Field(() => String)
  productId: string;

  @Field(() => Int)
  collectionId: number;
}
