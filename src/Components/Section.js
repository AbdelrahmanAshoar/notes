import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./AppBody.css";

import { useSection } from "./sectionsContext";
import { useTask } from "./TasksContext";
import Task from "./Task";
import AddTaskPopup, { BootstrapDialog } from "./AddTaskPopup";
import ColorPicker from "./ColorPicker";

import {
  Button,
  Box,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
} from "./UIComponent";

import { AddIcon } from "./icons";

export default function Section({ isLargeScreen }) {
  const { sections, deleteSection, setColorSection } = useSection();
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState("all");
  const [open, setOpen] = useState(false);
  const { tasks, deleteAllTasks } = useTask();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleColorSelect = (color) => {
    setColorSection(section.id, color);
  };

  const section = useMemo(() => {
    return sections.find((s) => {
      return s.id === +sectionId;
    });
  }, [sections, sectionId]);

  const allTasks = useMemo(() => {
    return tasks.filter((task) => {
      return task.section === section.title;
    });
  }, [tasks, section]);
  const doneTasks = useMemo(() => {
    return allTasks.filter((task) => {
      return task.done;
    });
  }, [allTasks]);
  const todoTasks = useMemo(() => {
    return allTasks.filter((task) => {
      return !task.done;
    });
  }, [allTasks]);

  const TasksList = (alignment) => {
    if (alignment === "todo") {
      return todoTasks;
    }
    if (alignment === "done") {
      return doneTasks;
    }
    return allTasks;
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>{section.title}</h2>
        <Box className="btn-group">
          <ToggleButtonGroup
            color="success"
            size="small"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="all" sx={{ color: "red" }}>
              All
            </ToggleButton>
            <ToggleButton value="done">Done</ToggleButton>
            <ToggleButton value="todo">To-Do</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Button
          variant="text"
          size="small"
          color="error"
          onClick={() => {
            deleteAllTasks(section.title);
            deleteSection(section.id);
            navigate("/");
          }}
        >
          Delete Section
        </Button>
      </div>

      <Box className="section-body" sx={{ my: 1 }}>
        {TasksList(alignment).map((task) => (
          <Task
            key={task.id}
            task={task}
            sectionColor={section.color}
            isLargeScreen={isLargeScreen}
          />
        ))}

        <Fab
          color="info"
          aria-label="add"
          sx={{ position: "fixed", bottom: 30, right: 30 }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <AddIcon />
        </Fab>
        <div style={{ position: "fixed", bottom: 30, right: 100 }}>
          <ColorPicker onColorSelect={handleColorSelect} />
        </div>
      </Box>

      {/*/////////////////////// Add task popup //////////////////////  */}
      <BootstrapDialog
        fullWidth
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <AddTaskPopup setOpen={setOpen} sectionId={section.title} />
      </BootstrapDialog>
    </div>
  );
}
