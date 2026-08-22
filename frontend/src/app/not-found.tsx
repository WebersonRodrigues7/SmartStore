'use client'

import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";

export default function NotFound() {
  const router = useRouter()
  return (
    <main className={styles.main}>
      <div className={styles.cabo}></div>
      <div className={styles.divLampada}></div>
      <div className={styles.lampada}></div>
      <div className={styles.luz}></div>
      <h1 className={styles.h1404}>404</h1>
      <h1 className={styles.notfound}>Página não encontrada</h1>

      <button onClick={() => router.push('/login')}>Continuar comprando</button>
    </main>
  );
}
