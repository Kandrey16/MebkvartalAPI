import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from '../model/category.model';
import { CategoryService } from '../services/category.service';
import { CreateCategoryInput } from '../dto/category/create-category.input';
import {
  CategoryBaseSchema,
  UpdateCategorySchema,
} from '../schema/category.schema';
import { UpdateCategoryInput } from '../dto/category/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Query(() => Category, { name: 'categoryBySlug', nullable: true })
  findBySlug(@Args('slug', { type: () => String }) slug: string) {
    return this.categoryService.findIdBySlug(slug);
  }

  @Mutation(() => Category)
  createCategory(@Args('input') input: CreateCategoryInput) {
    const data = CategoryBaseSchema.parse(input);
    return this.categoryService.create(data);
  }

  @Mutation(() => Category)
  updateCategory(@Args('input') input: UpdateCategoryInput) {
    const data = UpdateCategorySchema.parse(input);
    return this.categoryService.update(data.id, data);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}
