import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryAttributeGroupService } from '../services/category_attribute_group.service';
import { CategoryAttributeGroup } from '../model/category_attribute_group.model';
import { CreateCategoryAttributeGroupInput } from '../dto/category_attribute_group/create-category_attribute_group.input';
import { DeleteCategoryAttributeGroupInput } from '../dto/category_attribute_group/delete-category_attribute_group.input';
import {
  CategoryAttributeGroupBaseSchema,
  DeleteCategoryAttributeGroupSchema,
} from '../schema/category_attribute_group.schema';
import { Public } from 'src/auth/decopators/public.decorator';

@Resolver(() => CategoryAttributeGroup)
export class CategoryAttributeGroupResolver {
  constructor(
    private readonly categoryAttributeGroupService: CategoryAttributeGroupService,
  ) {}

  @Public()
  @Query(() => [CategoryAttributeGroup], { name: 'categoryAttributeGroups' })
  findAll(
    @Args('category', { type: () => Int, nullable: true })
    categoryId: number,
  ) {
    return this.categoryAttributeGroupService.findAll(categoryId);
  }

  @Query(() => CategoryAttributeGroup, {
    name: 'categoryAttributeGroup',
    nullable: true,
  })
  findOne(
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('attributeGroupId', { type: () => Int }) attributeGroupId: number,
  ) {
    return this.categoryAttributeGroupService.findOne(
      categoryId,
      attributeGroupId,
    );
  }

  @Mutation(() => CategoryAttributeGroup)
  createCategoryAttributeGroup(
    @Args('input') input: CreateCategoryAttributeGroupInput,
  ) {
    const data = CategoryAttributeGroupBaseSchema.parse(input);
    return this.categoryAttributeGroupService.create(data);
  }

  @Mutation(() => CategoryAttributeGroup)
  removeCategoryAttributeGroup(
    @Args('input') input: DeleteCategoryAttributeGroupInput,
  ) {
    const data = DeleteCategoryAttributeGroupSchema.parse(input);
    return this.categoryAttributeGroupService.remove(
      data.categoryId,
      data.attributeGroupId,
    );
  }
}
