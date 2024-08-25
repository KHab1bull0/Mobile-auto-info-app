/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Cars_type" AS ENUM ('yengil', 'moto', 'yuk');

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "transaction";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Transaction_type";

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xodim" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "xodim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jarima" (
    "id" TEXT NOT NULL,
    "tex_pass_raqami" TEXT NOT NULL,
    "mashina_raqami" TEXT NOT NULL,
    "xodim_id" TEXT NOT NULL,
    "jarima_egasi" TEXT NOT NULL,
    "jarima_sanasi" TEXT NOT NULL,
    "tolov_sanasi" TEXT NOT NULL,

    CONSTRAINT "jarima_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xizmat" (
    "id" TEXT NOT NULL,
    "mashina_raqami" TEXT NOT NULL,
    "xizmat_turi" TEXT NOT NULL,
    "xizmat_sanasi" TEXT NOT NULL,
    "muddati_sanasi" TEXT NOT NULL,

    CONSTRAINT "xizmat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "turi" TEXT NOT NULL,
    "nomi" TEXT NOT NULL,
    "sertificat_raqami" TEXT NOT NULL,
    "rahbat_FISH" TEXT NOT NULL,
    "manzili" TEXT NOT NULL,
    "telefon_raqami" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car" (
    "id" TEXT NOT NULL,
    "davlat_raqami" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "nomi" TEXT NOT NULL,
    "turi" "Cars_type" NOT NULL,
    "dvigitel_raqami" TEXT NOT NULL,
    "ot_kuchi" TEXT NOT NULL,
    "rangi" TEXT NOT NULL,
    "mashina_yili" TEXT NOT NULL,
    "texpassport_raqami" TEXT NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prava" (
    "id" TEXT NOT NULL,
    "ism" TEXT NOT NULL,
    "familiya" TEXT NOT NULL,
    "otasi_ismi" TEXT NOT NULL,
    "tugilgan_yili" TEXT NOT NULL,
    "yashash_manzili" TEXT NOT NULL,
    "prava_olingan_sana" TEXT NOT NULL,
    "prava_muddati" TEXT NOT NULL,
    "berilgan_joy" TEXT NOT NULL,

    CONSTRAINT "prava_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "xodim_email_key" ON "xodim"("email");

-- CreateIndex
CREATE UNIQUE INDEX "car_davlat_raqami_key" ON "car"("davlat_raqami");
