import { PrismaClient } from "./generated/prisma";


export default new PrismaClient({ log: ["error", "info", "query", "warn"] });