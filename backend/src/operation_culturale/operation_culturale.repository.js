import pkg from "@prisma/client";
import { debug } from "console";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export async function findById(id) {
  return prisma.operationCulturale.findUnique({
    where: {
      id: id,
    },
  });
}

export async function create(operationCulturale) {
  return prisma.operationCulturale.create({
    data: operationCulturale,
  });
}

export async function update(operationCulturale) {
  return prisma.operationCulturale.update({
    where: {
      id: operationCulturale.id,
    },
    data: operationCulturale,
  });
}
