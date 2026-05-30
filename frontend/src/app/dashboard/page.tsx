'use client'

import { useEffect, useState } from "react"
type PropsProducts = {
    name: string
    price: number
    stock: number
    description: string
}
export default function Dashboard() {
    const [data, setData] = useState<PropsProducts[]>([])

    useEffect(() => {
        fetch("api/products")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    return (
        <>
            {data.map((item, i) => (
                <div key={i}>
                    <h1>{item.name}</h1>

                </div>
            ))}

        </>
    )
}