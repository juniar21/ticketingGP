export function generateReferralCode(name: string): string {
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    const base = name.slice(0, 3).toUpperCase();
    return base + rand;
  }