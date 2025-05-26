/*
  Warnings:

  - You are about to drop the `ProductSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `inStock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductSize" DROP CONSTRAINT "ProductSize_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "inStock" INTEGER NOT NULL,
ADD COLUMN     "sizes" "Size"[] DEFAULT ARRAY[]::"Size"[];

-- DropTable
DROP TABLE "ProductSize";
