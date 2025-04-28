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
      referral?: string;
      expiredAt?: string;
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
    referral?: string;
    expiredAt?: string;
  }

  interface User {
    id: number;
    email: string;
    username?: string;
    avatar?: string;
    accessToken?: string;
    role?: string;
    fullname?: string;
    referral?: string;
    expiredAt?: string;
  }
}
