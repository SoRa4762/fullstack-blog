"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {};

const Register = (props: Props) => {
  const [err, setErr] = useState(false);

  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    console.log(name, email, password);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      res.status === 201 &&
        router.push("/dashboard/login?success=Account has been created");
    } catch (err) {
      setErr(true);
    }
  };

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="username" className="input" required />
        <input type="email" placeholder="email" className="input" required />
        <input
          type="password"
          placeholder="password"
          className="input"
          required
        />
        <button className="button">Register</button>
      </form>
      <h6>- OR -</h6>
      <Link href="/dashboard/login">
        Already have an account? Login with existing acount.
      </Link>
    </div>
  );
};

export default Register;
