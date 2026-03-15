import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttributeValueService } from '../services/attribute_value.service';
import { AttributeValue } from '../model/attribute_value.model';
import { CreateAttributeValueInput } from '../dto/attribute_value/create-attribute_value.input';
import { UpdateAttributeValueInput } from '../dto/attribute_value/update-attribute_value.input';
import {
  AttributeValueBaseSchema,
  UpdateAttributeValueSchema,
} from '../schema/attribute_value.schema';

@Resolver(() => AttributeValue)
export class AttributeValueResolver {
  constructor(private readonly attributeValueService: AttributeValueService) {}

  @Query(() => [AttributeValue], { name: 'attributeValues' })
  findAll() {
    return this.attributeValueService.findAll();
  }

  @Query(() => AttributeValue, { name: 'attributeValue', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attributeValueService.findOne(id);
  }

  @Mutation(() => AttributeValue)
  createAttributeValue(@Args('input') input: CreateAttributeValueInput) {
    const data = AttributeValueBaseSchema.parse(input);
    return this.attributeValueService.create(data);
  }

  @Mutation(() => AttributeValue)
  updateAttributeValue(@Args('input') input: UpdateAttributeValueInput) {
    const data = UpdateAttributeValueSchema.parse(input);
    return this.attributeValueService.update(data.id, data);
  }

  @Mutation(() => AttributeValue)
  removeAttributeValue(@Args('id', { type: () => Int }) id: number) {
    return this.attributeValueService.remove(id);
  }
}
