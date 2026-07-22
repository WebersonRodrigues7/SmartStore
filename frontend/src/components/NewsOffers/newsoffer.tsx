'use client'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react"
import styles from "./news.module.css"



export default function NewsOffer() {




    return (
        <main className={styles.mainNewsOffer}>
            <Swiper
                modules={[Navigation, Pagination]}
                className={styles.swipper}
                navigation
                pagination={
                    {
                        clickable: true,
                        type: 'bullets'
                    }

                }
                slidesPerView={1}
            >
                <SwiperSlide className={styles.slide1}></SwiperSlide>
                <SwiperSlide className={styles.slide2}></SwiperSlide>
                <SwiperSlide className={styles.slide3}></SwiperSlide>

            </Swiper>

        </main >
    )
}