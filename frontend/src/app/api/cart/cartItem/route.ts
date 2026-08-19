import { NextResponse, NextRequest } from "next/server";




export async function POST(req: NextRequest){
    const res = await fetch('https://smart-storeth.vercel.app/cart/cartItem', {
        method: 'POST',
        
    })
}