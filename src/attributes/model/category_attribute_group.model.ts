import { Field, ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Category } from './category.model';
import { AttributeGroup } from './attribute_group.model';

@ObjectType()
export class CategoryAttributeGroup {
  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  attributeGroupId: number;

  @Field(() => Category)
  category: Category;

  @Field(() => AttributeGroup)
  attributeGroup: AttributeGroup;
}
