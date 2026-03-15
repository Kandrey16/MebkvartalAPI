import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';
import { OrdersModule } from './orders/orders.module';
import { AttributesModule } from './attributes/attributes.module';
import { CartsModule } from './carts/carts.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    CommentsModule,
    OrdersModule,
    AttributesModule,
    CartsModule,
    WishlistModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
