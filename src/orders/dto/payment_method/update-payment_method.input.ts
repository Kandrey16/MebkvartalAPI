import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreatePaymentMethodInput } from './create-payment_method.input';

@InputType()
export class UpdatePaymentMethodInput extends PartialType(
  CreatePaymentMethodInput,
) {
  @Field(() => Int)
  id: number;
}
