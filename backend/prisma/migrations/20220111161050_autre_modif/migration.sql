/*
  Warnings:

  - You are about to drop the column `statut` on the `OperationCulturale` table. All the data in the column will be lost.
  - Added the required column `statut` to the `OperationCulturaleCulture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OperationCulturale" DROP COLUMN "statut";

-- AlterTable
ALTER TABLE "OperationCulturaleCulture" ADD COLUMN     "date_realisation" TIMESTAMP(3),
ADD COLUMN     "statut" TEXT NOT NULL;
