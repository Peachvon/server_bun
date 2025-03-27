import swagger from "@elysiajs/swagger";

export const swaggerConfig = swagger({
  path: "/docs",
  documentation: {
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "API documentation with grouped endpoints",
    },
    tags: [
      { name: "User", description: "User management endpoints" },
      { name: "Admin", description: "Product management endpoints" },
      { name: "Auth", description: "Authentication endpoints" },
    ],
  },
});
