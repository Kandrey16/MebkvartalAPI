import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { OrderStatus } from '../../model/order_status.enum';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  number: string;

  @Field(() => Float)
  totalPrice: number;

  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus;

  @Field(() => ID)
  userId: string;

  @Field(() => Int)
  addressId: number;

  @Field(() => Int)
  paymentMethodId: number;

  @Field(() => Int)
  deliveryMethodId: number;
}
