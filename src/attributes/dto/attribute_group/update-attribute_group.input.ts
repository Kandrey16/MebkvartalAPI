import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateAttributeGroupInput } from './create-attribute_group.input';

@InputType()
export class UpdateAttributeGroupInput extends PartialType(
  CreateAttributeGroupInput,
) {
  @Field(() => Int)
  id: number;
}
