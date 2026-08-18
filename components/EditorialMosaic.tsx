"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";

export default function EditorialMosaic({ brandName = "أثر" }: { brandName?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-paper py-16 sm:py-20 md:py-32" dir="rtl">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="mb-10 flex min-w-0 flex-col justify-between gap-10 border-t border-ink/15 pt-5 sm:mb-12 sm:pt-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[9px] font-bold tracking-[0.24em] text-copper uppercase sm:mb-4 sm:text-[10px] sm:tracking-[0.38em]">02 / visual index</p>
            <h2 className="max-w-[12ch] text-[clamp(2.35rem,11vw,5rem)] font-black leading-[1.12] tracking-[-0.035em] text-ink [text-wrap:balance] sm:max-w-2xl sm:text-6xl sm:leading-[1.02] md:text-8xl md:leading-[0.98]">
              المنتج ليس<br /><span className="text-copper">تفصيلًا صغيرًا.</span>
            </h2>
          </div>
          <p className="max-w-[32ch] text-[0.9rem] leading-7 text-ink/60 sm:text-sm sm:leading-8 md:text-base">
            في {brandName}، كل خامة تأخذ مساحتها. نترك للملمس أن يتكلم، وللخطوة أن تكمل المعنى.
          </p>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-5 md:mt-0 md:grid-cols-12 md:items-end">
          <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }} className="group relative aspect-[4/5] overflow-hidden bg-ink md:col-span-4">
            <Image src="/imeg/athr-editorial-black.png" alt="حذاء جلدي أسود من تحرير أثر" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-paper">
              <p className="text-[10px] font-bold tracking-[0.3em] text-copper uppercase">The black line</p>
              <p className="mt-2 text-2xl font-bold">الخط الأسود</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }} className="group relative aspect-[1.28/1] overflow-hidden bg-ink md:col-span-5 md:mb-16">
            <Image src="/imeg/athr-materials.png" alt="خامات صناعة أحذية أثر" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-paper">
              <p className="text-[10px] font-bold tracking-[0.3em] text-copper uppercase">Material / 01</p>
              <p className="mt-2 text-2xl font-bold">الخامة قبل الزينة</p>
            </div>
          </motion.div>

          <div className="flex flex-col justify-between gap-8 md:col-span-3 md:mb-5 md:min-h-[260px]">
            <p className="text-5xl font-black tracking-[-0.06em] text-ink/15 md:text-7xl">01—03</p>
            <div>
              <p className="mb-4 text-sm leading-8 text-ink/65">اكتشف مجموعات مرتبة حسب المزاج، المناسبة، والإيقاع الذي تعيشه.</p>
              <Link href="/products" className="group inline-flex items-center gap-3 border-b border-ink/20 pb-3 text-sm font-bold text-ink transition-colors hover:border-copper hover:text-copper">
                اذهب إلى الفهرس
                <ArrowUpLeft size={17} className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
