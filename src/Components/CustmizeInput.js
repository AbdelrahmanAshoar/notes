import { createTheme } from "@mui/material/styles";

export const customTheme = (outerTheme) => {
  return createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiFilledInput: {
        styleOverrides: {
          root: {
            color: "white",
            backgroundColor: "#333388",
            "&:hover": {
              backgroundColor: "#222277",
            },
            "&.Mui-focused": {
              backgroundColor: "#222277",
            },
          },
        },
      },
    },
  });
};
