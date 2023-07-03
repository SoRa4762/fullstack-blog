import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import { footerImages } from "@app/helper/data";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className={styles.container}>
      <div>©2023 Sore Zore. All rights reserved.</div>
      <div className={styles.social}>
        {footerImages.map((image) => (
          <Image
            key={image.id}
            src={image.src}
            width={15}
            height={15}
            alt={image.alt}
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;
