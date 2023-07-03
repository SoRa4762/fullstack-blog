"use client";
import Link from "next/link";
import React from "react";
import { Links } from "@app/helper/data";
import styles from "./navbar.module.css";
import DarkModeToggle from "@components/DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";

type Props = {};

const Navbar = (props: Props) => {
  const session = useSession();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Sore Zore
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {Links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" ? (
          <button className={styles.logout} onClick={signOut}>
            Logout
          </button>
        ) : (
          <Link className={styles.logout} href="/dashboard/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
