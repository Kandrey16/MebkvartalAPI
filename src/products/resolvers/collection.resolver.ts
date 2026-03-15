import { Args, Mutation, Query } from '@nestjs/graphql';
import { Collection } from '../model/collection.model';
import { CollectionService } from '../services/collection.service';
import { Resolver } from '@nestjs/graphql';
import { CreateCollectionInput } from '../dto/collection/create-collection.input';
import {
  CollectionBaseSchema,
  UpdateCollectionSchema,
} from '../schema/collection.schema';
import { UpdateCollectionInput } from '../dto/collection/update-collection.input';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Query(() => [Collection], { name: 'collections' })
  findAll() {
    return this.collectionService.findAll();
  }

  @Query(() => Collection, { name: 'collection', nullable: true })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.collectionService.findOne(id);
  }

  @Mutation(() => Collection)
  createCollection(@Args('input') input: CreateCollectionInput) {
    const data = CollectionBaseSchema.parse(input);
    return this.collectionService.create(data);
  }

  @Mutation(() => Collection)
  updateCollection(@Args('input') input: UpdateCollectionInput) {
    const data = UpdateCollectionSchema.parse(input);
    return this.collectionService.update(data.id, data);
  }

  @Mutation(() => Collection)
  removeCollection(@Args('id', { type: () => Number }) id: number) {
    return this.collectionService.remove(id);
  }
}
