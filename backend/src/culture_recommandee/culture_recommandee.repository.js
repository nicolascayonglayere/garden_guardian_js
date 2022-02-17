import pkg from "@prisma/client";
import { debug } from "console";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export async function findById(id) {
  return prisma.cultureRecommandee.findUnique({
    where: {
      id: id,
    },
    include: {
      operations_culturales: true,
    },
  });
}

export async function create(culture) {
  return prisma.cultureRecommandee.create({
    data: culture,
  });
}

export async function findAllByName(nom) {
  return prisma.cultureRecommandee.findMany({
    where: {
      nom: {
        contains: nom,
      },
    },
    include: {
      operations_culturales: true,
    },
  });
}

export async function findAllInConstruction() {
  return prisma.cultureRecommandee.findMany({
    where: {
      en_construction: true,
    },
    include: {
      operations_culturales: true,
    },
  });
}

export async function update(culture) {
  return prisma.cultureRecommandee.update({
    where: {
      id: culture.id,
    },
    data: culture,
    include: {
      operations_culturales: true,
    },
  });
}

export async function addOperationCulturale(
  operationCulturale,
  cultureId,
  operationCulturaleId
) {
  return prisma.cultureRecommandee.update({
    where: {
      id: cultureId,
    },
    data: {
      operations_culturales: {
        create: {
          origine_intervalle_possible:
            operationCulturale.origine_intervalle_possible,
          intervalle_possible: operationCulturale.intervalle_possible,
          statut: operationCulturale.statut,
          date_realisation: operationCulturale.date_realisation,
          operation_culturale: {
            connect: { id: operationCulturaleId },
          },
        },
      },
    },
    include: {
      operations_culturales: true,
    },
  });
}
