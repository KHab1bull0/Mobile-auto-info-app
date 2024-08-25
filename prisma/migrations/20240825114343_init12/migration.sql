/*
  Warnings:

  - You are about to drop the column `username` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `refreshtokens` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `xodim` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `refreshtokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `refreshtokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `xodim` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "admin_username_key";

-- DropIndex
DROP INDEX "refreshtokens_username_key";

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "refreshtokens" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "xodim" DROP COLUMN "name",
ADD COLUMN     "fullname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refreshtokens_email_key" ON "refreshtokens"("email");
