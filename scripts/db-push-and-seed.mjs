import { execFileSync } from 'node:child_process'

const databaseUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NO_SSL ||
  process.env.POSTGRES_URL_NON_POOLING

if (!databaseUrl) {
  throw new Error('A Neon connection variable is required: DATABASE_URL or POSTGRES_PRISMA_URL.')
}

const env = { ...process.env, DATABASE_URL: databaseUrl }
const prismaBin = process.platform === 'win32' ? 'prisma.cmd' : 'prisma'

console.log('Applying Prisma schema to the configured database...')
execFileSync(prismaBin, ['db', 'push', '--accept-data-loss'], {
  env,
  stdio: 'inherit',
})

console.log('Seeding the ATHR shoe catalog...')
execFileSync(process.execPath, ['scripts/seed-shoes.mjs'], {
  env,
  stdio: 'inherit',
})

console.log('ATHR catalog setup completed.')
