import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeliveryMethodService } from '../services/delivery_method.service';
import { DeliveryMethod } from '../model/delivery_method.model';
import { CreateDeliveryMethodInput } from '../dto/delivery_method/create-delivery_method.input';
import { UpdateDeliveryMethodInput } from '../dto/delivery_method/update-delivery_method.input';
import {
  DeliveryMethodBaseSchema,
  UpdateDeliveryMethodSchema,
} from '../schema/delivery_method.schema';

@Resolver(() => DeliveryMethod)
export class DeliveryMethodResolver {
  constructor(private readonly deliveryMethodService: DeliveryMethodService) {}

  @Query(() => [DeliveryMethod], { name: 'deliveryMethods' })
  findAll() {
    return this.deliveryMethodService.findAll();
  }

  @Query(() => DeliveryMethod, { name: 'deliveryMethod', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.deliveryMethodService.findOne(id);
  }

  @Mutation(() => DeliveryMethod)
  createDeliveryMethod(@Args('input') input: CreateDeliveryMethodInput) {
    const data = DeliveryMethodBaseSchema.parse(input);
    return this.deliveryMethodService.create(data);
  }

  @Mutation(() => DeliveryMethod)
  updateDeliveryMethod(@Args('input') input: UpdateDeliveryMethodInput) {
    const data = UpdateDeliveryMethodSchema.parse(input);
    return this.deliveryMethodService.update(data.id, data);
  }

  @Mutation(() => DeliveryMethod)
  removeDeliveryMethod(@Args('id', { type: () => Int }) id: number) {
    return this.deliveryMethodService.remove(id);
  }
}
