import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  PROCESSING = 'PROCESSING',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  RETURNED = 'RETURNED',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Order status',
});
