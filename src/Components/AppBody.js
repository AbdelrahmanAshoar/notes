import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./AppBody.css";
import task from "../note.png";

import { Home, SideMenu, Section } from "./resources";
import { Box, Button } from "./UIComponent";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AppBody() {
  const [open, setOpen] = React.useState(false);
  const isLargeScreen = useMediaQuery("(min-width:850px)");

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  return (
    <Box sx={{ background: "#2c3c6f" }}>
      <Box className="header">
        <img src={task} width={40} height={"40"} alt="task-image" />
        <h1>
          <Link to={"/"} className="Link-style">
            ToDoList
          </Link>
        </h1>
        {!isLargeScreen && (
          <Button
            variant="outlined"
            color="inherit"
            sx={{ ml: "auto" }}
            onClick={toggleDrawer(true)}
          >
            Sections
          </Button>
        )}
      </Box>

      <div className="app-body">
        <Drawer
          sx={{
            "& .MuiDrawer-paper": {
              background: "#2c3c6f",
              border: "none",
              height: "calc(100vh - 99px)",
              marginTop: "82px",
            },
          }}
          anchor="left"
          open={isLargeScreen || open}
          variant={isLargeScreen ? "persistent" : "temporary"}
          onClose={toggleDrawer(false)}
        >
          <Box sx={{ height: "calc(100vh - 88px)", width: 250 }}>
            <SideMenu toggleDrawer={toggleDrawer} />
          </Box>
        </Drawer>

        {/* Your main content here */}
        <Box
          className="section-container"
          component="main"
          sx={{
            borderRadius: "15px",
            m: 1,
            bgcolor: "white",
            translate: "0 -75px",
          }}
        >
          <Routes>
            <Route path="/notes" element={<Home />} />
            <Route
              path="/:sectionId"
              element={<Section isLargeScreen={isLargeScreen} />}
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </Box>
      </div>
    </Box>
  );
}
