import React from "react";
import styles from "./page.module.css";

type Props = {};

export const metadata = {
  title: "Contact Us",
  description: "Welcome to the contact section of Sore Zore",
};

const Contact = (props: Props) => {
  return <div className={styles.container}>Contact Page</div>;
};

export default Contact;
