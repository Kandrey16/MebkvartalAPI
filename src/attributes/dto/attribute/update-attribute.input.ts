import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateAttributeInput } from './create-attribute.input';

@InputType()
export class UpdateAttributeInput extends PartialType(CreateAttributeInput) {
  @Field(() => Int)
  id: number;
}
