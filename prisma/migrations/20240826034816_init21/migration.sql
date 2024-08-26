/*
  Warnings:

  - A unique constraint covering the columns `[dvigitel_raqami]` on the table `car` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "car_dvigitel_raqami_key" ON "car"("dvigitel_raqami");
