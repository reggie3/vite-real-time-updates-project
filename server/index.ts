import postgres from "postgres";

console.log(process.env.DATABASE_USER)
console.log(process.env.DATABASE_PASSWORD)
console.log(process.env.DATABASE_NAME)

const sql = postgres(`postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:5432/${process.env.DATABASE_NAME}`)
const [{ version }] = await sql`SELECT version()`;

console.log(version); 


Bun.serve({
    fetch(req) {
      const url = new URL(req.url);
      console.log(url.pathname)
      if (url.pathname === "/") return new Response("Home page!");
      if (url.pathname === "/todos") return handleTodos(req);
      return new Response("404!");
    },
  });


const handleTodos=async (req:Request)=>{
    if (req.method === "GET") {
        return await sql`SELECT * FROM todos`;
      }
      if (req.method === "POST") {
        return new Response("POST todos!");
      }
      return new Response("404!");
}