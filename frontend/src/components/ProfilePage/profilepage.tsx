"use client";

import { useSession } from "next-auth/react";
import styles from "./profilepage.module.css";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  console.log(session?.tokenBack)
  console.log(status);
  return (
    <main className={styles.main}>
      <aside>
        <p></p>
      </aside>
      <section></section>
    </main>
  );
}
