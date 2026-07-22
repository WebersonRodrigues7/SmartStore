
'use client'

import { useEffect, useState } from "react"
import styles from "./cards.module.css"
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5"



type CardsItemProps = {
    cardsImg: string
    cardsAlt: string
    cardsName: string
    cardsPrice: number
    cardsStock: number
    cardsDescription: string
}


export default function CardsItem({ cardsImg, cardsAlt, cardsName, cardsPrice, cardsStock, cardsDescription }: CardsItemProps) {
    

    return (
        <main className={styles.mainCards}>
            <main className={styles.cobrindoTudo}>
                <div className={styles.topCard}>
                    <div className={styles.topInsideCard} >
                        <img src={cardsImg} alt={cardsAlt} />
                        <div className={styles.topInteiro}>
                            <div>
                                <h1>{cardsName}</h1>
                                <h3>R${cardsPrice}</h3>
                            </div>
                            <h5>{cardsDescription}</h5>
                            
                        </div>
                    </div>
                </div>
            </main>


        </main>
    )
}