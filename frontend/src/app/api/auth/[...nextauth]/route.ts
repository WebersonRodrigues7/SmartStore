import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface ISesson {
  tokenBack?: string;
}
const secret = process.env.AUTH_SECRET;
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const res = await fetch("https://smart-storeth.vercel.app/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-type": "application/json" },
        });

        if (!res.ok) return null;

        const data = await res.json();

        return {
          id: String(data.user.id),
          email: data.user.email,
          token: data.token,
        };
      },
    }),
  ],
  secret: secret,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tokenBack = user.token;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.tokenBack = token.tokenBack;
      session.user.email = token.email;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
