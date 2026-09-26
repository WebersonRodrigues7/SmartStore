import NewsOffer from "@/components/NewsOffers/newsoffer";
import styles from "./dashboard.module.css";
import Header from "@/components/Header/header";
export default function Dashboard() {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.secNewsOffer}>
        <NewsOffer />
      </section>
      <section className={styles.s}></section>
    </main>
  );
}