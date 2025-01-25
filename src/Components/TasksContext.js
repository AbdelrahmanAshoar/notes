import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuId } from "uuid";

const TasksContext = createContext();
export const useTask = () => useContext(TasksContext);

const loadFormLoacalStorage = () => {
  const tasksSaved = localStorage.getItem("tasks");
  return tasksSaved ? JSON.parse(tasksSaved) : intialTasks;
};

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(loadFormLoacalStorage);

  useEffect(() =>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskInput, section) => {
    setTasks([
      ...tasks,
      {
        id: uuId(),
        title: taskInput.title,
        details: taskInput.details,
        section: section,
        done: false,
      },
    ]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (taskInput, id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id)
          return {
            ...task,
            title: taskInput.title,
            details: taskInput.details,
          };
        else return task;
      })
    );
  };

  const getTask = (id) => {
    tasks.filter((task) => task.id === id)
  }

  const toggelDone = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id && !task.done) return { ...task, done: true };
        else if (task.id === id && task.done) return { ...task, done: false };
        else return task;
      })
    );
  };

  const value = { tasks, addTask, deleteTask, updateTask, toggelDone, getTask };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

const intialTasks = [
  {
    id: 0,
    title: "first task",
    details: "my content...",
    section: "Today's Tasks",
    done: false,
  },
];
