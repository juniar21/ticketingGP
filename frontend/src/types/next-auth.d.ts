import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      username?: string;
      avatar?: string;
      role?: string;
      fullname?: string;
      refferal?: string;
    };
    accessToken?: string;
  }

  interface JWT {
    id: number;
    email: string;
    username?: string;
    avatar?: string;
    accessToken?: string;
    role?: string;
    fullname?: string;
    refferal?: string;
  }

  interface User {
    id: number;
    email: string;
    username?: string;
    avatar?: string;
    accessToken?: string;
    role?: string;
    fullname?: string;
    refferal?: string;
  }
}