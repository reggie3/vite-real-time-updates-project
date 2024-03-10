import { PrismaClient, type Todo } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

const CORS_HEADERS = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};

const prisma = new PrismaClient();

const getTodos = async () => {
  const todos = await prisma.todo.findMany();

  return todos;
};

const getTodo = async (id: string) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  return todo;
};

const addTodo = async (body: Todo) => {
  const transactionId = uuidv4();

  try {
    return await prisma.todo.upsert({
      where: { id: body.id ?? "0" },
      create: { ...body, transactionId },
      update: { ...body, transactionId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteTodo = async (id: string) => {
  const transactionId = uuidv4();

  const todo = await prisma.todo.delete({
    where: {
      id,
    },
  });

  return { ...todo, transactionId };
};

const app = new Elysia()
  // .use(swagger())
  .use(cors())
  .get("/todos", () => getTodos())
  .get("/todos/:id", ({ params: { id } }) => getTodo(id))
  .post("/todos", ({ body }) => addTodo(body as Todo))
  .put("/todos/:id", ({ body }) => addTodo(body as Todo))
  .delete("/todos/:id", ({ params: { id } }) => deleteTodo(id))
  .listen(process.env.VITE_REST_SERVER_PORT || 3000);

console.log("rest server started on port ", app.server?.port);

export type App = typeof app;
