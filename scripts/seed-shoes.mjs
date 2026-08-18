import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const imagePaths = Array.from({ length: 11 }, (_, index) => `/catalog/shoe-${String(index + 1).padStart(2, '0')}.jpg`)

const categories = [
  {
    name: 'سنيكرز يومية',
    shortName: 'السنيكرز اليومية',
    slug: 'daily-sneakers',
    description: 'سنيكرز خفيفة ومريحة لإطلالاتك اليومية والتنقل طوال اليوم.',
    gender: 'للجنسين',
    sizes: ['39', '40', '41', '42', '43', '44'],
    basePrice: 18500,
    names: ['خطوة المدينة', 'إيقاع أبيض', 'ظل رمادي', 'مدى كاجوال', 'نبض الشارع', 'أفق يومي', 'سكون أسود', 'مسار ناعم', 'أثر خفيف', 'رحلة قصيرة'],
  },
  {
    name: 'أحذية رسمية',
    shortName: 'الأحذية الرسمية',
    slug: 'formal-shoes',
    description: 'أحذية رسمية مصقولة تضيف حضورًا واثقًا للاجتماعات والمناسبات.',
    gender: 'رجالي',
    sizes: ['40', '41', '42', '43', '44', '45'],
    basePrice: 27500,
    names: ['هيبة جلد', 'موعد أسود', 'خط رسمي', 'مجلس بني', 'مقام كلاسيك', 'حضور لامع', 'وقار داكن', 'مقاس النخبة', 'بروتوكول', 'توقيع رسمي'],
  },
  {
    name: 'لوفرز وموكاسين',
    shortName: 'اللوفرز والموكاسين',
    slug: 'loafers-moccasins',
    description: 'لوفرز وموكاسين بانسيابية راقية تجمع بين سهولة الارتداء وأناقة التفاصيل.',
    gender: 'للجنسين',
    sizes: ['39', '40', '41', '42', '43', '44'],
    basePrice: 23500,
    names: ['لوفر أثَر', 'موكاسين هادئ', 'عنبر بني', 'مرونة جلد', 'خطوة لوفر', 'ممر كلاسيكي', 'قهوة داكنة', 'نعل حر', 'هدوء رملي', 'ظل فاخر'],
  },
  {
    name: 'بوتات شتوية',
    shortName: 'البوتات الشتوية',
    slug: 'winter-boots',
    description: 'بوتات متينة بخامات دافئة تمنحك ثباتًا وراحة في الأيام الباردة.',
    gender: 'للجنسين',
    sizes: ['39', '40', '41', '42', '43', '44'],
    basePrice: 32000,
    names: ['درب شتوي', 'صخر أسود', 'مطر بني', 'قمم جلدية', 'دفء المدينة', 'رحلة باردة', 'غابة داكنة', 'ظل الجبل', 'ممر طويل', 'بوت الأثر'],
  },
  {
    name: 'صنادل صيفية',
    shortName: 'الصنادل الصيفية',
    slug: 'summer-sandals',
    description: 'صنادل صيفية خفيفة بلمسات عملية تناسب الرحلات والأيام المشمسة.',
    gender: 'للجنسين',
    sizes: ['36', '37', '38', '39', '40', '41'],
    basePrice: 12500,
    names: ['نسمة صيف', 'رمل ناعم', 'شاطئ هادئ', 'ضوء النهار', 'خطوة بحر', 'صندل حر', 'موجة خفيفة', 'صيف رملي', 'ظل نخلة', 'مشوار مشمس'],
  },
  {
    name: 'أحذية رياضية للجري',
    shortName: 'أحذية الجري',
    slug: 'running-shoes',
    description: 'أحذية رياضية داعمة للجري والمشي، بوزن خفيف وتهوية مناسبة للحركة.',
    gender: 'للجنسين',
    sizes: ['39', '40', '41', '42', '43', '44'],
    basePrice: 22000,
    names: ['سرعة أولى', 'نبض Run', 'خط النهاية', 'أكسجين', 'عدّاء رمادي', 'إيقاع نشط', 'طاقة برتقالية', 'مسافة', 'مرونة Pro', 'صباح سريع'],
  },
  {
    name: 'أحذية نسائية أنيقة',
    shortName: 'الأحذية النسائية الأنيقة',
    slug: 'womens-elegant',
    description: 'تصاميم نسائية أنيقة بتفاصيل ناعمة لتكمّل إطلالاتك اليومية والمناسبات.',
    gender: 'نسائي',
    sizes: ['36', '37', '38', '39', '40', '41'],
    basePrice: 24500,
    names: ['لؤلؤة هادئة', 'كعب ناعم', 'روز كلاسيك', 'أناقة رمليّة', 'موعد أنيق', 'ساتان أسود', 'لمسة ذهب', 'مخمل ناعم', 'مشية واثقة', 'توقيع نسائي'],
  },
  {
    name: 'أحذية أطفال',
    shortName: 'أحذية الأطفال',
    slug: 'kids-shoes',
    description: 'أحذية أطفال مرنة ومريحة للحركة واللعب مع خامات سهلة العناية.',
    gender: 'أطفال',
    sizes: ['28', '29', '30', '31', '32', '33', '34', '35'],
    basePrice: 9500,
    names: ['خطوة صغيرة', 'مغامر أزرق', 'نجمة مرحة', 'ركضة أولى', 'سحاب صغير', 'لعب أبيض', 'قوس قزح', 'بطل اليوم', 'حكاية طفل', 'مشي مرح'],
  },
  {
    name: 'أحذية جلدية فاخرة',
    shortName: 'الأحذية الجلدية الفاخرة',
    slug: 'premium-leather',
    description: 'جلود مختارة وتشطيبات دقيقة لعشاق القطع التي تدوم وتزداد جمالًا مع الوقت.',
    gender: 'للجنسين',
    sizes: ['39', '40', '41', '42', '43', '44'],
    basePrice: 38000,
    names: ['جلد أصيل', 'حرفة فاخرة', 'بني أرستقراطي', 'أسود نخبوي', 'خياطة يدوية', 'ملمس طبيعي', 'تراث جلد', 'مقام فاخر', 'نعل إيطالي', 'قطعة توقيع'],
  },
  {
    name: 'إصدارات محدودة',
    shortName: 'الإصدارات المحدودة',
    slug: 'limited-editions',
    description: 'قطع محدودة الكمية لمحبي التصاميم المختلفة والحضور الذي لا يتكرر.',
    gender: 'للجنسين',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    basePrice: 42000,
    names: ['أثر 01', 'نسخة نادرة', 'ليل نحاسي', 'خطوة حصرية', 'إصدار 24', 'ظل محدود', 'مختار بعناية', 'قطعة واحدة', 'مشهد جديد', 'التوقيع الأخير'],
  },
]

const buildVariants = (category, basePrice, index) => category.sizes.map((size, sizeIndex) => ({
  size,
  price: basePrice,
  compareAtPrice: index % 3 === 0 ? basePrice + 2500 : null,
  stock: 5 + ((index + sizeIndex) % 6) * 3,
}))

async function main() {
  const collectionIds = []
  let productCount = 0

  for (const [categoryIndex, category] of categories.entries()) {
    const categoryImage = imagePaths[(categoryIndex * 2) % imagePaths.length]
    const collection = await prisma.collection.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        imageUrl: categoryImage,
        isActive: true,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        imageUrl: categoryImage,
        isActive: true,
        seoSearchPhrases: [category.name, 'أحذية', 'متجر أحذية', category.shortName],
      },
    })

    collectionIds.push(collection.id)

    for (let index = 0; index < category.names.length; index += 1) {
      const imageIndex = (categoryIndex * 2 + index) % imagePaths.length
      const imageUrl = imagePaths[imageIndex]
      const secondImage = imagePaths[(imageIndex + 1) % imagePaths.length]
      const price = category.basePrice + (index % 5) * 750
      const slug = `${category.slug}-${index + 1}`
      const productName = `${category.names[index]} — ${category.shortName}`
      const variants = buildVariants(category, price, index)

      const product = await prisma.product.upsert({
        where: { slug },
        update: {
          name: productName,
          brand: index % 3 === 0 ? 'أثَر' : index % 3 === 1 ? 'خطوة' : 'مدى',
          description: `${category.description} تصميم ${category.names[index]} مناسب لمن يبحث عن راحة واضحة وحضور متوازن في كل خطوة.`,
          price,
          compareAtPrice: index % 3 === 0 ? price + 2500 : null,
          sku: `ATHR-${String(categoryIndex + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`,
          size: `${category.sizes[0]}-${category.sizes[category.sizes.length - 1]}`,
          gender: category.gender,
          category: category.name,
          collectionId: collection.id,
          stock: variants.reduce((sum, variant) => sum + variant.stock, 0),
          featured: index === 0 || index === 5,
          bestseller: index === 1 || index === 4,
          isActive: true,
          imageUrl,
          images: [imageUrl, secondImage],
          seoSearchPhrases: [productName, category.name, 'حذاء', 'أحذية', category.gender],
          seoScore: 90,
        },
        create: {
          name: productName,
          slug,
          brand: index % 3 === 0 ? 'أثَر' : index % 3 === 1 ? 'خطوة' : 'مدى',
          description: `${category.description} تصميم ${category.names[index]} مناسب لمن يبحث عن راحة واضحة وحضور متوازن في كل خطوة.`,
          price,
          compareAtPrice: index % 3 === 0 ? price + 2500 : null,
          sku: `ATHR-${String(categoryIndex + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`,
          size: `${category.sizes[0]}-${category.sizes[category.sizes.length - 1]}`,
          gender: category.gender,
          category: category.name,
          collectionId: collection.id,
          stock: variants.reduce((sum, variant) => sum + variant.stock, 0),
          featured: index === 0 || index === 5,
          bestseller: index === 1 || index === 4,
          isActive: true,
          imageUrl,
          images: [imageUrl, secondImage],
          seoSearchPhrases: [productName, category.name, 'حذاء', 'أحذية', category.gender],
          seoScore: 90,
        },
      })

      await prisma.productVariant.deleteMany({ where: { productId: product.id } })
      await prisma.productVariant.createMany({
        data: variants.map((variant) => ({
          productId: product.id,
          size: variant.size,
          price: variant.price,
          compareAtPrice: variant.compareAtPrice,
          stock: variant.stock,
        })),
      })

      productCount += 1
    }
  }

  await prisma.collection.updateMany({
    where: { slug: { notIn: categories.map((category) => category.slug) } },
    data: { isActive: false },
  })

  await prisma.product.updateMany({
    where: { collectionId: { notIn: collectionIds } },
    data: { isActive: false },
  })

  const activeCollections = await prisma.collection.count({ where: { slug: { in: categories.map((category) => category.slug) }, isActive: true } })
  const activeProducts = await prisma.product.count({ where: { collectionId: { in: collectionIds }, isActive: true } })
  const variantCount = await prisma.productVariant.count({ where: { productId: { in: (await prisma.product.findMany({ where: { collectionId: { in: collectionIds } }, select: { id: true } })).map((product) => product.id) } } })

  console.log(JSON.stringify({ activeCollections, activeProducts, variantCount, seededProducts: productCount }, null, 2))
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
