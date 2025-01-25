import React from "react";

import { useTask } from "./TasksContext";
import { useAlert } from "./AlertProvider";
import EditTaskPopup, { BootstrapDialog } from "./EditTaskPopup";
import {
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "./UIComponent";

import {
  DeleteOutlineIcon,
  DoneIcon,
  EditOutlinedIcon,
  ExpandMoreIcon,
} from "./icons";

export default function Task({ task, sectionColor }) {
  const [open, setOpen] = React.useState(false);
  const { deleteTask, toggelDone } = useTask();
  const { handleClick } = useAlert();

  return (
    <Box sx={{ m: 2, px: "auto", maxWidth: 800 }}>
      <Accordion sx={{ bgcolor: sectionColor }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ borderBottom: "1px solid #ccc" }}
        >
          <Typography>{task.title}</Typography>
          <Box sx={{ ml: "auto" }}>
            <IconButton
              sx={{ border: "1px solid", color: "blue" }}
              aria-label="edit"
              size="small"
              onClick={() => {
                setOpen(true);
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              color="error"
              sx={{ border: "1px solid", mx: 2 }}
              aria-label="delete"
              size="small"
              onClick={() => deleteTask(task.id)}
            >
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton
              color="success"
              sx={{
                border: "1px solid",
                bgcolor: task.done ? "#3a3" : "",
                "&:hover": { bgcolor: task.done ? "#3a3" : "" },
              }}
              aria-label="done"
              size="small"
              onClick={() => {
                 toggelDone(task.id);
                if (!task.done) handleClick();
              }}
            >
              <DoneIcon />
            </IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 3 }}>{task.details}</AccordionDetails>
      </Accordion>

      {/* //////////////////////// popup for edit task///////////////////////////////// */}
      <BootstrapDialog
        fullWidth
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <EditTaskPopup setOpen={setOpen} taskId={task.id} task={task} />
      </BootstrapDialog>
    </Box>
  );
}
