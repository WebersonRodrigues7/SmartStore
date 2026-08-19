"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.email(),
  password: z.string().min(3),
});

type LoginSchema = z.infer<typeof schema>;
export default function LoginPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function onSubmitForm(data: LoginSchema) {
    const signI = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    console.log(signI)

    if (!signI) {
      throw new Error("Nao logou");
    }

    if (!signI.ok) {
      throw new Error("Nao logou no ok");
    }

    reset();
    router.push("/dashboard");
  }

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="text" />
        <label htmlFor="password">Senha</label>
        <input {...register("password")} type="password" />
        <button>Entrar</button>
      </form>
    </main>
  );
}
