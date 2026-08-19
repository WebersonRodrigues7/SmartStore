import NewsOffer from "@/components/NewsOffers/newsoffer";
import styles from "./dashboard.module.css";
import Header from "@/components/Header/header";
import HeroDashboard from "@/components/HeroDashboard/herodashboard";
export default function Dashboard() {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.secNewsOffer}>
        <NewsOffer />
      </section>
      <section className={styles.heroDashboard}>
        <HeroDashboard />
      </section>
      <section className={styles.s}></section>
    </main>
  );
}
