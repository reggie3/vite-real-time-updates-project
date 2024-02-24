import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AppBar, Container, Link as MuiLink } from "@mui/material";

export const Route = createRootRoute({
  component: () => (
    <Container>
      <AppBar
        position="static"
        sx={{ flexDirection: "row", gap: 2, padding: 2 }}
      >
        <MuiLink component={Link} to="/">
          Home
        </MuiLink>
        <MuiLink component={Link} to="/about">
          About
        </MuiLink>
        <MuiLink component={Link} to="/todos">
          Todos
        </MuiLink>
      </AppBar>
      <Outlet />
      <TanStackRouterDevtools />
    </Container>
  ),
});
