import { PrismaClient } from "@prisma/client";

const CORS_HEADERS = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};

const prisma = new PrismaClient();

Bun.serve({
  fetch(req) {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      const res = new Response("Departed", CORS_HEADERS);
      return res;
    }

    const url = new URL(req.url);
    console.log(url.pathname);
    if (url.pathname === "/") return new Response("Home page!");
    if (url.pathname === "/todos") return handleTodos(req);
    if (url.pathname.startsWith("/todos")) {
      const taskId = url.pathname.split("/")[2];
      return handleTodoWithId(req, taskId);
    }
    return new Response("404!");
  },
});

const handleTodos = async (req: Request) => {
  switch (req.method) {
    case "GET":
      const todos = await prisma.todo.findMany();
      return new Response(JSON.stringify({ todos }), CORS_HEADERS);

    case "POST":
      if (!req?.headers?.get("content-type")?.includes("application/json")) {
        return new Response("Invalid content type!", { status: 400 });
      }
      const body = await req.json();
      if (!body.title) {
        return new Response("Title is required!", { status: 400 });
      }

      const todo = await prisma.todo.upsert({
        where: {
          id: body.id ? body.id : "0",
        },
        create: {
          ...body,
          id: Math.random().toString(36).substring(7),
        },
        update: body,
      });
      return new Response(JSON.stringify({ todo }), CORS_HEADERS);

    default:
      return new Response("404!");
  }
};

const handleTodoWithId = async (req: Request, todoId: string) => {
  console.log({ todoId });

  let todo;

  switch (req.method) {
    case "DELETE":
      todo = await prisma.todo.delete({
        where: {
          id: todoId,
        },
      });
      break;

    case "PUT":
      if (!req?.headers?.get("content-type")?.includes("application/json")) {
        return new Response("Invalid content type!", { status: 400 });
      }
      const body = await req.json();
      todo = await prisma.todo.update({
        where: {
          id: todoId,
        },
        data: body,
      });
      break;

    case "GET":
      todo = await prisma.todo.findUnique({
        where: {
          id: todoId,
        },
      });

      break;

    default:
      return new Response("404!");
  }

  return new Response(JSON.stringify({ todo }), CORS_HEADERS);
};
