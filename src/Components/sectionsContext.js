// src/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const SectionContext = createContext([]);

export const useSection = () => useContext(SectionContext);

const loadFormLocalStorage = () => {
  const savedSections = localStorage.getItem("sections");
  return savedSections ? JSON.parse(savedSections) : [...intialSections];
};

export const SectionProvider = ({ children }) => {
  const [sections, setSections] = useState(loadFormLocalStorage);

  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections));
  }, [sections]);

  const clearAllLocalStorage = () => {
    setSections([]);
    localStorage.clear();
  };

  const addSection = (section, _id) => {
    setSections([...sections, { id: _id, title: section, color: "#fff" }]);
  };

  const deleteSection = (_id) => {
    setSections((prev) => prev.filter((s) => s.id !== _id));
    setSections((prev) =>
      prev.map((s) => {
        if (s.id > _id) return { ...s, id: s.id - 1 };
        else return s;
      })
    );
  };

  const setColorSection = (_id, _color) => {
    setSections(
      sections.map((s) => {
        if (s.id === _id) return { ...s, color: _color };
        else return s;
      })
    );
  };

  const value = { sections, addSection, deleteSection, setColorSection, clearAllLocalStorage };

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
};

const intialSections = [
  { id: 0, title: "Today's Tasks", color: "white" },
  { id: 1, title: "Week's Tasks", color: "white" },
  { id: 2, title: "Month's Tasks", color: "white" },
];
