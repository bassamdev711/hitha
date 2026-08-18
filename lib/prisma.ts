import { PrismaClient } from '@prisma/client'

// Vercel's Neon integration exposes POSTGRES_PRISMA_URL by default, while
// Prisma's schema and local setup conventionally use DATABASE_URL. Normalize
// the provider variable before the client is initialized so both environments
// work without duplicating or exposing connection strings in application code.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NO_SSL ||
    process.env.DIRECT_URL
}

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
