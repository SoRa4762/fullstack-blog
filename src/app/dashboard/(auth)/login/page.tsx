"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    await signIn("credentials", { email, password });
  };

  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="email" placeholder="email" className="input" required />
        <input
          type="password"
          placeholder="password"
          className="input"
          required
        />
        <button className="button">Login</button>
      </form>
      <button className="button" onClick={() => signIn("google")}>
        Login with Google
      </button>
      <h6>- OR -</h6>
      <Link href="/dashboard/register">New Here? Register</Link>
    </div>
  );
};

export default Login;
