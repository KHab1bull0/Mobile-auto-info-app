/*
  Warnings:

  - Changed the type of `guvohnoma_raqami` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "guvohnoma_raqami",
ADD COLUMN     "guvohnoma_raqami" INTEGER NOT NULL;
