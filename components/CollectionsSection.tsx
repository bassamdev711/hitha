import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpLeft } from 'lucide-react'

type CollectionCard = {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
}

export const revalidate = 3600

export default async function CollectionsSection({ brandName = 'أثر' }: { brandName?: string }) {
  let collections: CollectionCard[] = []

  try {
    collections = await prisma.collection.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
  } catch (error) {
    console.error('Failed to load collections:', error)
  }

  if (collections.length === 0) return null

  return (
    <section id="collections" className="relative overflow-hidden bg-paper py-24 md:py-36" dir="rtl">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col justify-between gap-7 border-t border-ink/15 pt-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[10px] font-bold tracking-[0.4em] text-copper uppercase">05 / the collection index</p>
            <h2 className="text-5xl font-black leading-[0.94] tracking-[-0.05em] text-ink sm:text-7xl md:text-8xl">فهرس<br /><span className="text-copper">الخطوة.</span></h2>
          </div>
          <div className="flex max-w-sm items-end justify-between gap-8 md:pb-2">
            <p className="text-sm leading-8 text-ink/55">عشر مساحات مختلفة للقدم، للمزاج، ولليوم الذي تختاره.</p>
            <Link href="/products" className="hidden shrink-0 border-b border-ink/25 pb-2 text-xs font-bold text-ink transition-colors hover:border-copper hover:text-copper md:block">كل الفهرس <ArrowUpLeft className="mr-2 inline" size={15} /></Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {collections.map((collection, index) => {
            const featured = index === 0 || index === 5
            return (
              <Link key={collection.id} href={`/products?collection=${collection.slug}`} className={`group relative overflow-hidden bg-ink ${featured ? 'aspect-[1.25/1] sm:aspect-[1.1/1] lg:col-span-6' : 'aspect-[1/1.1] lg:col-span-3'}`}>
                {collection.imageUrl ? (
                  <Image src={collection.imageUrl} alt={collection.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#2a2825]"><span className="text-4xl font-black text-paper/15">{brandName}</span></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-paper md:inset-x-7 md:bottom-7">
                  <div>
                    <p className="mb-2 text-[10px] font-bold tracking-[0.3em] text-copper uppercase">0{index + 1} / edit</p>
                    <h3 className={`${featured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'} font-black tracking-[-0.04em]`}>{collection.name}</h3>
                    {collection.description && <p className="mt-2 max-w-xs text-xs leading-6 text-paper/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{collection.description}</p>}
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/30 text-copper transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"><ArrowUpLeft size={17} /></span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
