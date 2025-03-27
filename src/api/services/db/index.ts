// const globalForPrisma = global as unknown as { prisma: PrismaClient };
import { PrismaClient } from "@prisma/client";

// export const prisma = globalForPrisma.prisma || new PrismaClient();
export const prisma = new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export async function checkDatabaseConnection(): Promise<any> {
  try {
    // พยายามเชื่อมต่อกับฐานข้อมูล
    await prisma.$queryRaw`SELECT 1`;
    console.log("Connected to the database.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    throw err;
  }
}
