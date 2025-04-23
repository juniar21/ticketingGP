import Credentials from "next-auth/providers/credentials";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(user) {
        if (user) return user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    signIn: async () => {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.avatar = user.avatar;
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.fullname = user.fullname;
        token.refferal = user.refferal;
      }
      return token;
    },
    async session({ token, session }: { token: JWT; session: Session }) {
      session.user = {
        id: token.id as number,
        email: token.email as string,
        username: token.username as string,
        avatar: token.avatar as string,
        role: token.role as string,
        fullname: token.fullname as string,
        refferal: token.refferal as string,
      };
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
