/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone_url` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `photo_url` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "Transaction_type" AS ENUM ('input', 'output');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "email",
DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "phone",
DROP COLUMN "phone_url",
ADD COLUMN     "photo_url" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user',
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "admin";

-- DropTable
DROP TABLE "student";

-- DropTable
DROP TABLE "teacher";

-- DropTable
DROP TABLE "test";

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "category_id" BOOLEAN NOT NULL DEFAULT false,
    "type" "Transaction_type" NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);
