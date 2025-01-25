import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./AppBody.css";
import task from "../tasks.png";

import { AlertProvider } from "./AlertProvider";
import { Home, SideMenu, Section } from "./resources";

import { Box } from "./UIComponent";

export default function AppBody() {
  return (
    <AlertProvider>
      <Box>
        <Box className="app-body">
          <Box>
            <Box className="header">
              <img src={task} width={40} height={"40"} alt="" />
              <h1>
                <Link to={"/"} className="Link-style">
                  ToDoList
                </Link>
              </h1>
            </Box>
            <SideMenu />
          </Box>

          <Box sx={{ borderRadius: "15px", m: 1, bgcolor: "white" }}>
            <Routes>
              <Route path="/notes" element={<Home />} />
              <Route path="/:sectionId" element={<Section />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </AlertProvider>
  );
}
