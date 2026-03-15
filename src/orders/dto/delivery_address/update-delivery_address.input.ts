import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateDeliveryAddressInput } from './create-delivery_address.input';

@InputType()
export class UpdateDeliveryAddressInput extends PartialType(
  CreateDeliveryAddressInput,
) {
  @Field(() => Int)
  id: number;
}
