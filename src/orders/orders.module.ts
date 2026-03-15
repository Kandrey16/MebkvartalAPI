import { Module } from '@nestjs/common';
import { OrderResolver } from './resolvers/order.resolver';
import { OrderItemResolver } from './resolvers/order_item.resolver';
import { DeliveryAddressResolver } from './resolvers/delivery_address.resolver';
import { PaymentMethodResolver } from './resolvers/payment_method.resolver';
import { DeliveryMethodResolver } from './resolvers/delivery_method.resolver';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order_item.service';
import { DeliveryAddressService } from './services/delivery_address.service';
import { PaymentMethodService } from './services/payment_method.service';
import { DeliveryMethodService } from './services/delivery_method.service';

@Module({
  providers: [
    OrderResolver,
    OrderItemResolver,
    DeliveryAddressResolver,
    PaymentMethodResolver,
    DeliveryMethodResolver,

    OrderService,
    OrderItemService,
    DeliveryAddressService,
    PaymentMethodService,
    DeliveryMethodService,
  ],
})
export class OrdersModule {}
