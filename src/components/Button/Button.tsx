import React from "react";
import styles from "./button.module.css";
import Link from "next/link";
import { ButtonType } from "@app/helper/types";

const Button = ({ text, url }: ButtonType) => {
  return (
    <Link href={url}>
      <button className={styles.container}>{text}</button>
    </Link>
  );
};

export default Button;
