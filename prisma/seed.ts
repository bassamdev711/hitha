import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  await prisma.storeSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      storeName: process.env.STORE_NAME?.trim() || 'أثر',
      storeNameLatin: process.env.STORE_NAME_LATIN?.trim() || 'ATHR',
      storeTagline: process.env.STORE_TAGLINE?.trim() || 'منتجات مختارة بعناية، وتجربة تستحق التذكر.',
      storeDescription: process.env.STORE_DESCRIPTION?.trim() || 'اكتشف مجموعة مختارة من المنتجات مع تجربة تسوق واضحة وآمنة ومصممة لعلامتك التجارية.',
      locale: process.env.STORE_LOCALE?.trim() || 'ar',
      currencyCode: process.env.STORE_CURRENCY?.trim().toUpperCase() || 'USD',
      storeUrl: process.env.STORE_URL?.trim() || null,
    },
  })

  const shippingCityCount = await prisma.shippingCity.count()
  if (shippingCityCount === 0) {
    await prisma.shippingCity.create({
      data: { name: 'إب', shippingFee: 0, isActive: true },
    })
    console.log('Created default shipping city: إب')
  }

  console.log('Store settings and default shipping data are ready. The ATHR catalog is managed by scripts/seed-shoes.mjs.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
