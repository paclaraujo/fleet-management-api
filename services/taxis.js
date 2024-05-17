const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  getTaxis: async (pagination) => await prisma.taxis.findMany(pagination),
  getTaxisByIdAndTrajectoriesDate: async (taxiId, date, nextDay, pagination) => {
    return await prisma.taxis.findUnique({
      where: { id: parseInt(taxiId) },
      include: {
        Trajectories: {
          ...pagination,
          where: {
            date: {
              gte: date,
              lte: nextDay,
            },
          },
          select: {
            latitude: true,
            longitude: true,
            date: true,
          },
        },
      },
    });
  },
  getTaxisLastTrajectorie: async (pagination) => {

  
    return await prisma.taxis.findMany({
      ...pagination,
      include: {
        Trajectories: {
          skip: 0,
          take: 1,
          orderBy: { date: "desc" },
          select: {
            latitude: true,
            longitude: true,
            date: true,
          },
        },
      },
    });
  }
}
