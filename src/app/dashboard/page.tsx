"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { notFound, useRouter } from "next/navigation";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { PostType } from "@app/helper/types";
import Link from "next/link";
import EditModal from "@components/Modal/page";

type Props = {};

const Dashboard = (props: Props) => {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `api/posts?username=${session.data?.user.name}`,
    fetcher
  );

  //router protection
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data?.user.name,
        }),
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.map((post: PostType) => (
            <div className={styles.post} key={post._id}>
              <Link href={`blog/${post._id}`}>
                <div className={styles.imgContainer}>
                  <Image src={post.img} alt="" width={200} height={130} />
                </div>
              </Link>

              <h2 className={styles.postTitle}>{post.title}</h2>
              <EditModal
                _id={post._id}
                title={post.title}
                img={post.img}
                desc={post.desc}
                content={post.content}
              />
              <span
                className={styles.delete}
                onClick={() => handleDelete(post._id)}
              >
                X
              </span>
            </div>
          ))
        )}
      </div>
      <form className={styles.new} onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
        <input type="text" placeholder="Title" className="input" />
        <input type="text" placeholder="Desc" className="input" />
        <input type="text" placeholder="Image" className="input" />
        <textarea cols={30} rows={10} placeholder="Content" className="input" />
        <button className="button" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
