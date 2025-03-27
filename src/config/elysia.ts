import staticPlugin from "@elysiajs/static";
import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import router from "@routes/v1";
import { jwt } from "@elysiajs/jwt";
import { swaggerConfig } from "./swagger";
import { checkDatabaseConnection, prisma } from "@services/db";
const path = require("path");

const app = new Elysia().use(staticPlugin());
app.use(swaggerConfig);
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.group("/api", (app) => app.use(router));

//  Serve static files from the React app(Next.js)
// app.use(express.static(" v"));
app.get("*", () => {
  return Bun.file(path.resolve(__dirname, "..", "..", "view", "index.html"));
});

export async function startServer() {
  try {
    await checkDatabaseConnection();
  } catch (error) {
    console.error("Database connection failed. Shutting down server...");
    return process.exit(1);
  }

  app.listen(3000);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}

export default app;
