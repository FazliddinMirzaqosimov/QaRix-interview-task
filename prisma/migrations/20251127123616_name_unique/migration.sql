/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CarModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CarModel_name_key" ON "CarModel"("name");
