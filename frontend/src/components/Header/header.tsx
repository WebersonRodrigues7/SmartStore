"use client";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./header.module.css";
import "swiper/css";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiCoupon2Fill } from "react-icons/ri";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
export default function Header() {
  const [open, setOpen] = useState(false);
    const router = useRouter()
  return (
    <header className={styles.header}>
      <section className={styles.topSecOffer}>
        <Swiper
          className={styles.swipper}
          modules={[Autoplay]}
          loop={true}
          spaceBetween={50}
          allowTouchMove={false}
          centeredSlides={true}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
          }}
        >
          <SwiperSlide color="green" className={styles.slide}>
            THSMART PARA 10% OFF <RiCoupon2Fill size={20} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            Frete grátis para todo o Brasil <LiaShippingFastSolid size={20} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            5% OFF na primeira compra!
          </SwiperSlide>
        </Swiper>
      </section>
      <section className={styles.midSect}>
        <h1>TH SMART</h1>
        <IoMenu
          color="#2E8B57"
          size={50}
          className={styles.menuIcon}
          onClick={() => setOpen(!open)}
        />
        {open && (
          <ul className={styles.ulMobile}>
            <li>HOME</li>
            <li>PRODUTOS</li>
            <li>
              <FaRegUser id={styles.profile} size={40} />
            </li>
            <button>LOGOUT</button>
            <FaShoppingCart id={styles.cart} size={35} />
          </ul>
        )}
        <ul className={styles.ulPc}>
          <li>HOME</li>
          <li>PRODUTOS</li>
          <li onClick={() => router.push('/profile')}>
            <FaRegUser id={styles.profile} size={40} />
          </li>
          <button>LOGOUT</button>
          <FaShoppingCart id={styles.cart} size={35} />
        </ul>
      </section>
    </header>
  );
}
