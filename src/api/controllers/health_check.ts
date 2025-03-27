import { checkDatabaseConnection } from "@services/db";
import { Context } from "elysia";
interface User {
  name: string;
  age: number;
}
export const healthCheck = async ({ query }: { query: User }) => {
  try {
    await checkDatabaseConnection();
    return new Response("ok", { status: 200 });
  } catch (error) {
    return new Response("errordb", { status: 500 });
  }
};
