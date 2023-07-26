import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // @ts-expect-error
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          return new NextResponse("User not found.", { status: 400 });
        }
        const hashedPassword = user.hashedPassword;

        if (typeof hashedPassword !== "string") {
          return new NextResponse("Password invalid.", { status: 400 });
        }
        const isMatch = bcrypt.compare(hashedPassword, credentials?.password!);

        if (!isMatch) {
          return new NextResponse("Password incorrect.", { status: 400 });
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
