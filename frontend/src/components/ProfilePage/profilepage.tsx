"use client";

import { useSession } from "next-auth/react";
import styles from "./profilepage.module.css";
import Header from "../Header/header";

export default function ProfilePage() {
  const { data: session, status } = useSession();


  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.heroProf}>
        <aside className={styles.aside}></aside>
        <section className={styles.rightSide}>
          <div className={styles.userInfo}>
            <img src="/User-Background-PNG.png" alt="" />
            <div>
              <h3>{session?.user?.name}</h3>
              <p>{session?.user?.email}</p>
            </div>
          </div>
          <div>
            
          </div>
        </section>
      </section>
    </main>
  );
}
