"use client";

import CardsItem from "@/components/CardsItem/cardsitem";
import Header from "@/components/Header/header";
import styles from "./products.module.css";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

type PropsCard = {
  id: number;
  img: string;
  name: string;
  price: number;
  stock: number;
  description: string;
};

const schema = z.object({
  name: z.string().min(3, "Minimo 3 caracteres!"),
  price: z.number(),
  stock: z.number(),
  description: z.string().min(10, "Minimo 10 caracteres!"),
  img: z.any(),
});

type ProductsSchema = z.infer<typeof schema>;

export default function Dashboard() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductsSchema>({
    resolver: zodResolver(schema),
  });
  const { data, isLoading, isError } = useQuery<PropsCard[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");

      if (!res.ok) throw new Error("Erro");

      return res.json();
    },
  });

  if (isLoading) return <p>Carregando...</p>;

  if (isError) return <p>Erro</p>;

  return (
    <main className={styles.dashboard}>
      <Header />
      {data?.map((item) => (
        <section key={item.id} className={styles.cardSection}>
          <CardsItem
            cardsImg={`http://localhost:3005${item.img}`}
            cardsAlt="foto"
            cardsName={item.name}
            cardsPrice={item.price}
            cardsDescription={item.description}
            cardsStock={item.stock}
          />
        </section>
      ))}
    </main>
  );
}
