"use client";
import React, { useContext } from "react";
import styles from "./darkModeToggle.module.css";
import { ThemeContext } from "@context/ThemeContext";
import { ContextType } from "@app/helper/types";

type Props = {};

const DarkModeToggle = (props: Props) => {
  const { toggle, theme }: ContextType = useContext(ThemeContext);

  return (
    <>
      <div className={styles.container} onClick={toggle}>
        <div className={styles.icon}>🌙</div>
        <div className={styles.icon}>🔆</div>
        <div
          className={styles.ball}
          style={theme === "dark" ? { right: "2px" } : { left: "2px" }}
        />
      </div>
    </>
  );
};

export default DarkModeToggle;
