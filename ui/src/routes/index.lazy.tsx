import { createLazyFileRoute } from "@tanstack/react-router";
import { Container } from "@mui/material";
import { TodoGrid } from "../components/TodoGrid";
import { TodoForm } from "../components/TodoForm";
import { MyDivider } from "../components/MyDivder";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Container>
      <MyDivider />
      <TodoGrid />
      <MyDivider />
      <TodoForm />
    </Container>
  );
}
