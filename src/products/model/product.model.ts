import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ProductImage } from './product_image.model';
import { Attribute } from 'src/attributes/model/attribute.model';

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

  @Field(() => [ProductImage])
  productImages: ProductImage[];

  @Field(() => [Attribute], { nullable: true })
  attributes?: Attribute[];
}

@ObjectType()
export class Facet {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  attribute: string;

  @Field(() => [Value])
  values: Value[];
}

@ObjectType()
export class Value {
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

  @Field(() => Int)
  total: number;
}
