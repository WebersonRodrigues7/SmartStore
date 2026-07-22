"use client";

import { useQuery } from "@tanstack/react-query";
import CardsItem from "../CardsItem/cardsitem";
import styles from "./herodashboard.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { AiTwotoneThunderbolt } from "react-icons/ai";

type PropsCard = {
  id: number;
  img: string;
  name: string;
  price: number;
  stock: number;
  description: string;
};

export default function HeroDashboard() {
  const { data, isLoading, isError } = useQuery<PropsCard[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");

      if (!res.ok) throw new Error();

      return res.json();
    },
  });

  if (isLoading) return <p>Carregando</p>;

  if (isError) return <p>Erro!</p>;

  return (
    <main className={styles.mainHero}>
      <h1 className={styles.imperdiveis}>Imperdiveis <span><AiTwotoneThunderbolt size={25} /></span></h1>

      <div className={styles.divSwiper}>
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            type: "bullets",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            630: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={0}
          className={styles.swiper}
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <CardsItem
                cardsName={item.name}
                cardsDescription={item.description}
                cardsAlt="eletronico"
                cardsPrice={item.price}
                cardsImg={`http://localhost:3005/${item.img}`}
                cardsStock={item.stock}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
