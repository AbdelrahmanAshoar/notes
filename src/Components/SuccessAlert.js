import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


export default function SuccessAlert({open}) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          GREATE, you've done your task ✨
        </Alert>
      </Snackbar>
    </div>
  );
}
