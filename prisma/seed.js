const fs = require("fs");
const { PrismaClient, Prisma }  = require("@prisma/client");

const prisma = new PrismaClient()

async function rawSql() {
  fs.readdir("./prisma/data", async (err, files) => {
    if (err) console.log(err);
    else {
      for (const file of files) {
        const sqls =  fs.readFileSync(`./prisma/data/${file}`, {
          encoding: "utf8",
        })
        .toString()
        .split(';')

        await prisma.$transaction(sqls.map(sql => {
          return prisma.$queryRaw`${Prisma.raw(sql)}` 
        }), {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          maxWait: 5000,
          timeout: 10000,
        })
      }
    }
  });
}

rawSql()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
