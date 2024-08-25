/*
  Warnings:

  - Added the required column `guvohnoma_raqami` to the `prava` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prava" ADD COLUMN     "guvohnoma_raqami" INTEGER NOT NULL;
