/*
  Warnings:

  - You are about to drop the column `intervalle_possible` on the `OperationCulturale` table. All the data in the column will be lost.
  - You are about to drop the column `origine_intervalle_possible` on the `OperationCulturale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OperationCulturale" DROP CONSTRAINT "OperationCulturale_culture_id_fkey";

-- AlterTable
ALTER TABLE "OperationCulturale" DROP COLUMN "intervalle_possible",
DROP COLUMN "origine_intervalle_possible";

-- CreateTable
CREATE TABLE "OperationCulturaleCulture" (
    "culture_id" INTEGER NOT NULL,
    "operation_id" INTEGER NOT NULL,
    "origine_intervalle_possible" INTEGER NOT NULL,
    "intervalle_possible" INTEGER NOT NULL,

    CONSTRAINT "OperationCulturaleCulture_pkey" PRIMARY KEY ("culture_id","operation_id")
);

-- AddForeignKey
ALTER TABLE "OperationCulturaleCulture" ADD CONSTRAINT "OperationCulturaleCulture_culture_id_fkey" FOREIGN KEY ("culture_id") REFERENCES "CultureRecommandee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationCulturaleCulture" ADD CONSTRAINT "OperationCulturaleCulture_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "OperationCulturale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
