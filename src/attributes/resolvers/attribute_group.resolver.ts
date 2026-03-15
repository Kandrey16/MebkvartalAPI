import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttributeGroupService } from '../services/attribute_group.service';
import { AttributeGroup } from '../model/attribute_group.model';
import { CreateAttributeGroupInput } from '../dto/attribute_group/create-attribute_group.input';
import { UpdateAttributeGroupInput } from '../dto/attribute_group/update-attribute_group.input';
import {
  AttributeGroupBaseSchema,
  UpdateAttributeGroupSchema,
} from '../schema/attribute_group.schema';

@Resolver(() => AttributeGroup)
export class AttributeGroupResolver {
  constructor(private readonly attributeGroupService: AttributeGroupService) {}

  @Query(() => [AttributeGroup], { name: 'attributeGroups' })
  findAll() {
    return this.attributeGroupService.findAll();
  }

  @Query(() => AttributeGroup, { name: 'attributeGroup', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attributeGroupService.findOne(id);
  }

  @Mutation(() => AttributeGroup)
  createAttributeGroup(@Args('input') input: CreateAttributeGroupInput) {
    const data = AttributeGroupBaseSchema.parse(input);
    return this.attributeGroupService.create(data);
  }

  @Mutation(() => AttributeGroup)
  updateAttributeGroup(@Args('input') input: UpdateAttributeGroupInput) {
    const data = UpdateAttributeGroupSchema.parse(input);
    return this.attributeGroupService.update(data.id, data);
  }

  @Mutation(() => AttributeGroup)
  removeAttributeGroup(@Args('id', { type: () => Int }) id: number) {
    return this.attributeGroupService.remove(id);
  }
}
