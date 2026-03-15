import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeliveryAddressService } from '../services/delivery_address.service';
import { DeliveryAddress } from '../model/delivery_address.model';
import { CreateDeliveryAddressInput } from '../dto/delivery_address/create-delivery_address.input';
import { UpdateDeliveryAddressInput } from '../dto/delivery_address/update-delivery_address.input';
import {
  DeliveryAddressBaseSchema,
  UpdateDeliveryAddressSchema,
} from '../schema/delivery_address.schema';

@Resolver(() => DeliveryAddress)
export class DeliveryAddressResolver {
  constructor(
    private readonly deliveryAddressService: DeliveryAddressService,
  ) {}

  @Query(() => [DeliveryAddress], { name: 'deliveryAddresses' })
  findAll() {
    return this.deliveryAddressService.findAll();
  }

  @Query(() => DeliveryAddress, { name: 'deliveryAddress', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.deliveryAddressService.findOne(id);
  }

  @Mutation(() => DeliveryAddress)
  createDeliveryAddress(@Args('input') input: CreateDeliveryAddressInput) {
    const data = DeliveryAddressBaseSchema.parse(input);
    return this.deliveryAddressService.create(data);
  }

  @Mutation(() => DeliveryAddress)
  updateDeliveryAddress(@Args('input') input: UpdateDeliveryAddressInput) {
    const data = UpdateDeliveryAddressSchema.parse(input);
    return this.deliveryAddressService.update(data.id, data);
  }

  @Mutation(() => DeliveryAddress)
  removeDeliveryAddress(@Args('id', { type: () => Int }) id: number) {
    return this.deliveryAddressService.remove(id);
  }
}
