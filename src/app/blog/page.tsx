import React, { cache } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogContentType, PostContentType } from "@app/helper/types";

type Props = {};

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  const resJson = res;

  console.log("this is res", resJson);
  return res.json();
}

const Blog = async (props: Props) => {
  const data = await getData();
  console.log("this is data", data);
  return (
    <div className={styles.mainContainer}>
      {data.map((item: BlogContentType) => (
        <Link
          href={`/blog/${item._id}`}
          className={styles.container}
          key={item._id}
        >
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt="Blog Image"
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className="styles.content">
            <h1>{item.title}</h1>
            <p>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
