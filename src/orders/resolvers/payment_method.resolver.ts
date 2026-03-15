import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentMethodService } from '../services/payment_method.service';
import { PaymentMethod } from '../model/payment_method.model';
import { CreatePaymentMethodInput } from '../dto/payment_method/create-payment_method.input';
import { UpdatePaymentMethodInput } from '../dto/payment_method/update-payment_method.input';
import {
  PaymentMethodBaseSchema,
  UpdatePaymentMethodSchema,
} from '../schema/payment_method.schema';

@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Query(() => [PaymentMethod], { name: 'paymentMethods' })
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Query(() => PaymentMethod, { name: 'paymentMethod', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentMethodService.findOne(id);
  }

  @Mutation(() => PaymentMethod)
  createPaymentMethod(@Args('input') input: CreatePaymentMethodInput) {
    const data = PaymentMethodBaseSchema.parse(input);
    return this.paymentMethodService.create(data);
  }

  @Mutation(() => PaymentMethod)
  updatePaymentMethod(@Args('input') input: UpdatePaymentMethodInput) {
    const data = UpdatePaymentMethodSchema.parse(input);
    return this.paymentMethodService.update(data.id, data);
  }

  @Mutation(() => PaymentMethod)
  removePaymentMethod(@Args('id', { type: () => Int }) id: number) {
    return this.paymentMethodService.remove(id);
  }
}
