import app, { startServer } from "@config/elysia";
import { prisma } from "@services/db";

startServer();
process.on("exit", async () => {
  await prisma.$disconnect();
});
