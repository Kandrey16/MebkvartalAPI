import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from './order_status.enum';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  number: string;

  @Field(() => Float)
  totalPrice: number;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => ID)
  userId: string;

  @Field(() => Number)
  addressId: number;

  @Field(() => Number)
  paymentMethodId: number;

  @Field(() => Number)
  deliveryMethodId: number;
}
