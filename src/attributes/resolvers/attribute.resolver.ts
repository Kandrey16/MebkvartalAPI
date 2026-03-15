import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttributeService } from '../services/attribute.service';
import { Attribute } from '../model/attribute.model';
import { CreateAttributeInput } from '../dto/attribute/create-attribute.input';
import { UpdateAttributeInput } from '../dto/attribute/update-attribute.input';
import {
  AttributeBaseSchema,
  UpdateAttributeSchema,
} from '../schema/attribute.schema';

@Resolver(() => Attribute)
export class AttributeResolver {
  constructor(private readonly attributeService: AttributeService) {}

  @Query(() => [Attribute], { name: 'attributes' })
  findAll() {
    return this.attributeService.findAll();
  }

  @Query(() => Attribute, { name: 'attribute', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attributeService.findOne(id);
  }

  @Mutation(() => Attribute)
  createAttribute(@Args('input') input: CreateAttributeInput) {
    const data = AttributeBaseSchema.parse(input);
    return this.attributeService.create(data);
  }

  @Mutation(() => Attribute)
  updateAttribute(@Args('input') input: UpdateAttributeInput) {
    const data = UpdateAttributeSchema.parse(input);
    return this.attributeService.update(data.id, data);
  }

  @Mutation(() => Attribute)
  removeAttribute(@Args('id', { type: () => Int }) id: number) {
    return this.attributeService.remove(id);
  }
}
