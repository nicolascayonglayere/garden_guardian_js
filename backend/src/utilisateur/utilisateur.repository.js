import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export async function findByEmail(email) {
  return prisma.utilisateur.findUnique({
    where: {
      email: email,
    },
    include: {
      calendriers: true,
      calendriers_crees: true,
    },
  });
}

export async function findById(id) {
  return prisma.utilisateur.findUnique({
    where: {
      id: id,
    },
    include: {
      calendriers: true,
      calendriers_crees: true,
    },
  });
}

export async function createUser(user) {
  return prisma.utilisateur.create({ data: user });
}

export async function updateUser(user, id) {
  return prisma.utilisateur.update({
    where: {
      id: id,
    },
    data: user,
    include: {
      calendriers: true,
      calendriers_crees: true,
    },
  });
}

export async function addCalendar(user, date, calendrier) {
  return prisma.utilisateur.update({
    where: {
      id: user.id,
    },
    data: {
      calendriers: {
        create: {
          date_utilisation: date,
          calendrier_id: calendrier.id,
        },
      },
    },
  });
}

export async function findByToken(token) {
  return prisma.utilisateur.findUnique({
    where: {
      token: token,
    },
  });
}
