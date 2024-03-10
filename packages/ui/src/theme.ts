import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4CAF50", // Green color for primary elements
    },
    secondary: {
      main: "#8BC34A", // Light green color for secondary elements
    },
    success: {
      main: "#689F38", // Dark green color for success elements
    },
    background: {
      default: "#263238", // Dark background color
      paper: "#37474F", // Background color for Paper components
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
  },
});

export default theme;
