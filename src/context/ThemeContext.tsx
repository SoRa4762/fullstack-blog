"use client";

import { ChildrenType } from "@app/helper/types";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }: ChildrenType) => {
  const [theme, setTheme] = useState("dark");
  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // const [modelIsOpen, setModelIsOpen]

  return (
    <ThemeContext.Provider value={{ toggle, theme }}>
      <div className={`theme ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
