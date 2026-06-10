import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Node.js Backend Boilerplate",
      version: "1.0.0",
      description:
        "Production-ready backend boilerplate built with Node.js, TypeScript, Prisma, PostgreSQL, Redis and BullMQ",
    },

    servers: [
      {
        url: "http://localhost:4001/api/v1",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: [
    "./src/modules/**/*.ts",
  ],
};

export const swaggerSpec =
  swaggerJsdoc(options);