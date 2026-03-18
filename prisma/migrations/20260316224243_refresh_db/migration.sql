/*
  Warnings:

  - You are about to drop the `attribute_groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attribute_values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cart_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category_attribute_groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comment_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `delivery_addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `delivery_methods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_methods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_attribute_values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_collections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wishlist_items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attribute_values" DROP CONSTRAINT "attribute_values_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "attributes" DROP CONSTRAINT "attributes_attribute_group_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "category_attribute_groups" DROP CONSTRAINT "category_attribute_groups_attribute_group_id_fkey";

-- DropForeignKey
ALTER TABLE "category_attribute_groups" DROP CONSTRAINT "category_attribute_groups_category_id_fkey";

-- DropForeignKey
ALTER TABLE "comment_images" DROP CONSTRAINT "comment_images_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_product_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "delivery_addresses" DROP CONSTRAINT "delivery_addresses_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_address_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_delivery_method_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_payment_method_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "product_attribute_values_attribute_value_id_fkey";

-- DropForeignKey
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "product_attribute_values_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_collections" DROP CONSTRAINT "product_collections_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "product_collections" DROP CONSTRAINT "product_collections_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "wishlist_items" DROP CONSTRAINT "wishlist_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "wishlist_items" DROP CONSTRAINT "wishlist_items_user_id_fkey";

-- DropTable
DROP TABLE "attribute_groups";

-- DropTable
DROP TABLE "attribute_values";

-- DropTable
DROP TABLE "attributes";

-- DropTable
DROP TABLE "brands";

-- DropTable
DROP TABLE "cart_items";

-- DropTable
DROP TABLE "carts";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "category_attribute_groups";

-- DropTable
DROP TABLE "collections";

-- DropTable
DROP TABLE "comment_images";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "delivery_addresses";

-- DropTable
DROP TABLE "delivery_methods";

-- DropTable
DROP TABLE "order_items";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "payment_methods";

-- DropTable
DROP TABLE "product_attribute_values";

-- DropTable
DROP TABLE "product_collections";

-- DropTable
DROP TABLE "product_images";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "tokens";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "wishlist_items";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "Role";
