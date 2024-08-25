/*
  Warnings:

  - Changed the type of `tex_pass_raqami` on the `jarima` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "jarima" DROP COLUMN "tex_pass_raqami",
ADD COLUMN     "tex_pass_raqami" INTEGER NOT NULL;
