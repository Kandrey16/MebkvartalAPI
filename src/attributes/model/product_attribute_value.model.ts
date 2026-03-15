import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductAttributeValue {
  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  attributeValueId: number;
}
