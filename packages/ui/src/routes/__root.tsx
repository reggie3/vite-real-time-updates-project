import { NavBar } from "../components/NavBar";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <NavBar />,
});
