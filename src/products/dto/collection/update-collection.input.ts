import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateCollectionInput } from './create-collection.input';

@InputType()
export class UpdateCollectionInput extends PartialType(CreateCollectionInput) {
  @Field(() => Int)
  id: number;
}
