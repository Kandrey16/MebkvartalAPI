import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => Number)
  price: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  availableQuantity: number;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Int)
  brandId: number;

  @Field(() => Int)
  categoryId: number;
}

@ObjectType()
export class Facet {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  value: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class FacetProduct {
  @Field(() => [Product])
  items: Product[];

  @Field(() => [Facet])
  facets: Facet[];
}
