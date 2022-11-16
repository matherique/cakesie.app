import { loginSchema } from "@/shared/validations/user";
import { compare } from "@/shared/encrypter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const creds = await loginSchema.parseAsync(credentials);

        const user = await prisma?.user.findFirst({
          where: { email: creds.email },
        });

        if (!user) {
          return null;
        }

        if (!compare(user.password, creds.password)) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },

  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/criar-conta",
    newUser: "/entrar",
  },
  debug: true,
};
