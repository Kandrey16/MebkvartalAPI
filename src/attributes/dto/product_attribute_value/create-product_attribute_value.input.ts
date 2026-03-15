import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductAttributeValueInput {
  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  attributeValueId: number;
}
