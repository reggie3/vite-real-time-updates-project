import { Link, Outlet } from "@tanstack/react-router";
import {
  AppBar,
  Box,
  Container,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import useLogin from "../../hooks/useLogin";

const NavBar = () => {
  const { data } = useLogin();
  console.log({ data });

  return (
    <Container>
      <AppBar
        position="static"
        sx={{
          flexDirection: "row",
          gap: 2,
          padding: 2,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <MuiLink component={Link} to="/">
            Home
          </MuiLink>
          <MuiLink component={Link} to="/about">
            About
          </MuiLink>
          <MuiLink component={Link} to="/todos">
            Todos
          </MuiLink>
        </Box>
        {data?.username && <Typography>Welcome {data.username}</Typography>}
      </AppBar>
      <Outlet />
      <TanStackRouterDevtools />
    </Container>
  );
};

export default NavBar;
