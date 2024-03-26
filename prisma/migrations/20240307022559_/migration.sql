/*
  Warnings:

  - You are about to drop the column `totalCost` on the `payment` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` DROP COLUMN `totalCost`,
    ADD COLUMN `amount` DOUBLE NOT NULL;
