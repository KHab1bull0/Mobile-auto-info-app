/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `refreshtokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "refreshtokens_username_key" ON "refreshtokens"("username");
