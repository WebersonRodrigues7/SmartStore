export async function GET() {
  const res = await fetch("https://smart-storeth.vercel.app/cart");
  const data = await res.json();

  return Response.json(data);
}
