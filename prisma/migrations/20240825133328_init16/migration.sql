/*
  Warnings:

  - A unique constraint covering the columns `[guvohnoma_raqami]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guvohnoma_raqami]` on the table `prava` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_guvohnoma_raqami_key" ON "User"("guvohnoma_raqami");

-- CreateIndex
CREATE UNIQUE INDEX "prava_guvohnoma_raqami_key" ON "prava"("guvohnoma_raqami");
