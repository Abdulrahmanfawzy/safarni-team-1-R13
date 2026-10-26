
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const apiUrl = process.env.API?.replace(/\/$/, "");

        if (!apiUrl) {
          console.error("Login: API environment variable is missing");
          return null;
        }
        const response = await fetch(
          `${apiUrl}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        if (!response.ok) {
          return null;
        }

        const result = await response.json();

        if (!result.success || !result.data?.token) {
          return null;
        }

        const { user, token } = result.data;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
          accessToken: token,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
