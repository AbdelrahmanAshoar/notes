import "./sideMenu.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSection } from "./sectionsContext";
import { useTask } from "./TasksContext";

import { ArrowUpwardIcon, DeleteIcon } from "./icons";
import {
  Button,
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  FilledInput,
} from "./UIComponent";

export default function SideMenu({toggleDrawer}) {
  const { sections, addSection, clearAllLocalStorage } = useSection();
  const { deleteAllTasks } = useTask();
  const [sectionInput, setSectionInput] = useState("");
  const navigate = useNavigate();

  const handleAddSection = () => {
    addSection(sectionInput, sections.length);
  };

  const sectionsList = sections.map((section) => {
    return (
      <NavLink key={section.id} to={`${section.id}`} onClick={toggleDrawer(false)}>
        <li>{section.title}</li>
      </NavLink>
    );
  });

  return (
    <div className="sideMenu">
      <nav style={{ width: "100%" }} >{sectionsList}</nav>

      <div>
        <FormControl sx={{ m: 1, width: "25ch", mb: 2 }} variant="filled">
          <InputLabel>Add Section</InputLabel>
          <FilledInput
            value={sectionInput}
            onChange={(ev) => {
              setSectionInput(ev.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                {sectionInput !== "" ? (
                  <IconButton
                    size="large"
                    sx={{ borderRadius: "30%" }}
                    onClick={handleAddSection}
                  >
                    <ArrowUpwardIcon color="info" />
                  </IconButton>
                ) : (
                  <></>
                )}
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          color="error"
          sx={{ ml: 2, my: 2 }}
          startIcon={<DeleteIcon />}
          onClick={() => {
            deleteAllTasks(undefined);
            clearAllLocalStorage();
            navigate("/");
          }}
        >
          Delete all Sections
        </Button>
      </div>
    </div>
  );
}
