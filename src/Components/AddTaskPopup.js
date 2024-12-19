import * as React from "react";
import { useState } from "react";

import { useTask } from "./TasksContext";

import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from "./UIComponent";

import { IconButton, CloseIcon } from "./icons";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddTaskPopup({ setOpen, sectionId }) {
  const [taskInput, setTaskInput] = useState({ title: "", details: "" });
  const { addTask } = useTask();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle
        sx={{ m: 0, p: 2, width: "100%" }}
        color="primary"
        id="customized-dialog-title"
      >
        Task
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box>
          <TextField
            id="standard-basic"
            label="Title"
            fullWidth
            color="primary"
            sx={{ mb: 2 }}
            variant="standard"
            onChange={(ev) => {
              setTaskInput({ ...taskInput, title: ev.target.value });
            }}
          />
          <TextField
            id="standard-basic"
            label="Details"
            fullWidth
            color="primary"
            variant="standard"
            onChange={(ev) => {
              setTaskInput({ ...taskInput, details: ev.target.value });
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            addTask(taskInput, sectionId);
            handleClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
}
