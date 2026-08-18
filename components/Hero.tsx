"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpLeft, Check } from "lucide-react";
import Link from "next/link";

type HeroData = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroDescription?: string | null
  heroPrimaryButton?: string | null
  heroSecondaryButton?: string | null
}

export default function Hero({
  data = {},
  brandName = 'أثر',
  brandNameLatin = 'ATHR',
}: {
  data?: HeroData
  brandName?: string
  brandNameLatin?: string
}) {
  const scrollToAbout = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-ink text-paper" dir="rtl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(198,128,69,0.18),transparent_30%),linear-gradient(115deg,#131313_0%,#1e1c19_52%,#0d0d0d_100%)]" />
      <div className="absolute inset-y-0 left-[13%] hidden w-px bg-white/10 lg:block" />
      <div className="absolute bottom-10 right-10 h-16 w-16 border-b border-r border-copper/70" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1600px] grid-cols-1 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 flex flex-col justify-end px-6 pb-12 pt-32 sm:px-10 lg:order-1 lg:px-14 lg:pb-20 xl:px-24"
        >
          <div className="mb-8 flex items-center gap-3 text-[10px] font-bold tracking-[0.4em] text-copper uppercase">
            <span className="h-px w-12 bg-copper" />
            <span>الفصل الأول / أثر يومي</span>
          </div>

          <p className="mb-6 text-xs font-medium tracking-[0.3em] text-paper/55 uppercase">
            {brandNameLatin} <span className="mr-2 tracking-normal text-paper/35">/ {brandName}</span>
          </p>
          <h1 className="max-w-[680px] text-[3.7rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-6xl md:text-7xl xl:text-[7.4rem]">
            {data.heroTitle || "يمشي معك.\nيُرى قبلك."}
          </h1>
          <p className="mt-7 max-w-xl text-xl font-light leading-relaxed text-paper/75 sm:text-2xl">
            {data.heroSubtitle || "أحذية تُبنى حول الخطوة، لا حول الضجيج."}
          </p>
          <p className="mt-5 max-w-lg whitespace-pre-line text-sm leading-8 text-paper/50 sm:text-base">
            {data.heroDescription || "تشكيلة منتقاة من الجلد، القماش، والملمس.\nتصميم واضح، راحة يومية، وأثر لا يحتاج إلى شرح."}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-[11px] text-paper/65">
            {['خامات محسوبة', 'مقاسات صريحة', 'توصيل موثوق'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check size={13} className="text-copper" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/products" className="group inline-flex items-center gap-4 bg-copper px-6 py-4 text-sm font-bold text-ink transition-transform hover:-translate-y-1">
              {data.heroPrimaryButton || "تسوّق المجموعة"}
              <ArrowDownLeft size={18} className="transition-transform group-hover:-translate-x-1 group-hover:translate-y-1" />
            </Link>
            <button onClick={scrollToAbout} className="group inline-flex items-center gap-3 border-b border-paper/35 px-1 py-3 text-sm text-paper/80 transition-colors hover:border-copper hover:text-copper">
              {data.heroSecondaryButton || "اقرأ فلسفة أثر"}
              <ArrowUpLeft size={16} />
            </button>
          </div>

          <div className="mt-14 flex items-end justify-between border-t border-paper/15 pt-5 text-[10px] tracking-[0.25em] text-paper/35 uppercase">
            <span>01 — The opening edit</span>
            <span className="text-paper/55">سطر جديد للحركة</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 relative min-h-[56svh] overflow-hidden lg:order-2 lg:min-h-[100svh]"
        >
          <Image
            src="/imeg/athr-hero-art.png"
            alt="تكوين فني لأحذية أثر"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 65vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/10" />
          <div className="absolute inset-x-6 bottom-7 flex items-end justify-between sm:inset-x-10 sm:bottom-10 lg:inset-x-14 lg:bottom-14">
            <div>
              <p className="text-[10px] font-bold tracking-[0.35em] text-copper uppercase">Quiet form / loud presence</p>
              <p className="mt-2 text-sm text-paper/70">ثلاثة أشكال. موقف واحد.</p>
            </div>
            <span className="text-7xl font-black leading-none text-paper/15 sm:text-9xl">01</span>
          </div>
          <div className="absolute right-6 top-28 h-24 w-24 border-r border-t border-copper/70 sm:right-10 sm:top-36 lg:right-14" />
        </motion.div>
      </div>
    </section>
  );
}
