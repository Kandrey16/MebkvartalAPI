import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

registerEnumType(Role, {
  name: 'Role', // имя должно совпадать с тем, что будет в GraphQL schema
  description: 'User role',
});
