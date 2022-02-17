/*
  Warnings:

  - You are about to drop the column `culture_id` on the `OperationCulturale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OperationCulturale" DROP COLUMN "culture_id";

-- AlterTable
ALTER TABLE "OperationCulturaleCulture" ALTER COLUMN "statut" SET DEFAULT E'TODO';
