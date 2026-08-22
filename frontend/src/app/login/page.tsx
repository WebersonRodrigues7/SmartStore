"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import styles from "./login.module.css";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef } from "react";
import gsap from "gsap";

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

  const sectionRef = useRef(null);
  useEffect(() => {
    gsap.from(sectionRef.current, {
      y: -100,
      filter: "blur(5px)",
      duration: 1,
      opacity: 0,
    });
  }, []);

  const router = useRouter();

  async function onSubmitForm(data: LoginSchema) {
    const signI = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    console.log(signI);

    if (!signI) {
      throw new Error("Nao logou");
    }

    if (!signI.ok) {
      throw new Error("Nao logou no ok");
    }

    reset();
    router.push("/dashboard");
  }

  async function signInGoogle() {
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  }

  return (
    <main className={styles.main}>
      <section ref={sectionRef}>
        <h2>Entrar</h2>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className={styles.divInput}>
            <input {...register("email")} type="text" placeholder="Email" />
          </div>
          <div className={styles.divInput}>
            <input
              {...register("password")}
              type="password"
              placeholder="Senha"
            />
          </div>
          <button>ENTRAR</button>
          <div className={styles.checkDiv}>
            <input className={styles.check} type="checkbox" />
            <p>Continuar logado</p>
          </div>
        </form>

        <div className={styles.divTop}>
          <h3>
            OU <span></span>
          </h3>
          <button onClick={signInGoogle}>
            <FcGoogle size={25} />
            Google
          </button>
        </div>
        <footer className={styles.footer}>
          <p>
            Novo por aqui? <span>Cadastrar</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
