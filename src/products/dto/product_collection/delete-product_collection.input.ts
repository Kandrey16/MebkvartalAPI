import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteProductCollectionInput {
  @Field(() => String, { description: 'The ID of the product' })
  productId: string;

  @Field(() => Int, { description: 'The ID of the collection' })
  collectionId: number;
}
