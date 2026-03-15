import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateDeliveryMethodInput } from './create-delivery_method.input';

@InputType()
export class UpdateDeliveryMethodInput extends PartialType(
  CreateDeliveryMethodInput,
) {
  @Field(() => Int)
  id: number;
}
