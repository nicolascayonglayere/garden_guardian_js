import pkg from "@prisma/client";
import { debug } from "console";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export async function findById(id) {
  return await prisma.calendrier.findUnique({
    where: {
      id: id,
    },
    include: {
      cultures: true,
    },
  });
}

export async function findAllByAuthorId(id) {
  return await prisma.calendrier.findMany({
    where: {
      auteur_id: id,
    },
  });
}

export async function createCalendar(calendrier, date) {
  return await prisma.calendrier.create({
    data: {
      auteur_id: calendrier.auteur.id,
      date_creation: date,
      cultures: {
        createMany: {
          data: calendrier.cultures,
        },
      },
    },
  });
}

export async function updateCalendrier(calendrier) {
  return await prisma.calendrier.update({
    where: {
      id: calendrier.id,
    },
    data: calendrier,
  });
}
