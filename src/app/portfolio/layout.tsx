import React from "react";
import styles from "./page.module.css";
import { ChildrenType } from "@app/helper/types";

export const metadata = {
  title: "Portfolio",
  description: "This is the collection of our works",
};

const Layout = ({ children }: ChildrenType) => {
  return (
    <div>
      <h1 className={styles.mainTitle}>Our Works</h1>
      {children}
    </div>
  );
};

export default Layout;
