import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateAttributeValueInput } from './create-attribute_value.input';

@InputType()
export class UpdateAttributeValueInput extends PartialType(
  CreateAttributeValueInput,
) {
  @Field(() => Int)
  id: number;
}
