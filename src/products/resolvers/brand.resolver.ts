import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/brand.model';
import { CreateBrandInput } from '../dto/brand/create-brand.input';
import { BrandBaseSchema, UpdateBrandSchema } from '../schema/brand.schema';
import { UpdateBrandInput } from '../dto/brand/update-brand.input';
import { Roles } from 'src/auth/decopators/role.decorator';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Roles('USER')
  @Query(() => [Brand], { name: 'brands' })
  findAll() {
    return this.brandService.findAll();
  }

  @Query(() => Brand, { name: 'brand', nullable: true })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.brandService.findOne(id);
  }

  @Mutation(() => Brand)
  createBrand(@Args('input') input: CreateBrandInput) {
    const data = BrandBaseSchema.parse(input);
    return this.brandService.create(data);
  }

  @Mutation(() => Brand)
  updateBrand(@Args('input') input: UpdateBrandInput) {
    const data = UpdateBrandSchema.parse(input);
    return this.brandService.update(data.id, data);
  }

  @Mutation(() => Brand)
  removeBrand(@Args('id', { type: () => Number }) id: number) {
    return this.brandService.remove(id);
  }
}
