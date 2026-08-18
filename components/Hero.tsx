"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";

type HeroData = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroDescription?: string | null
  heroPrimaryButton?: string | null
  heroSecondaryButton?: string | null
}

export default function Hero({
  data = {},
  brandName = 'متجرك',
  brandNameLatin = 'YOUR STORE',
}: {
  data?: HeroData
  brandName?: string
  brandNameLatin?: string
}) {
  const scrollToProducts = () => {
    const section = document.getElementById("products");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    const section = document.getElementById("about");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full min-h-[100dvh] overflow-hidden bg-surface" dir="rtl">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_78%_18%,color-mix(in_srgb,var(--color-accent)_12%,transparent),transparent_34%),linear-gradient(130deg,transparent_0%,color-mix(in_srgb,var(--color-brand)_5%,transparent)_100%)]" />
      <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-[1440px] grid-cols-1 items-stretch lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="order-2 flex flex-col justify-center px-6 pb-12 pt-28 sm:px-10 lg:order-1 lg:px-16 lg:pb-20 lg:pt-32 xl:px-24"
        >
          <div className="mb-7 flex items-center gap-3 text-xs font-bold tracking-[0.28em] text-accent">
            <span className="h-px w-10 bg-accent" />
            <span>مختارات يومية • إصدار جديد</span>
          </div>

          <p className="mb-4 text-sm font-medium tracking-[0.22em] text-foreground/55 uppercase">{brandNameLatin} <span className="mr-2 tracking-normal text-foreground/40">/ {brandName}</span></p>
          <h1 className="max-w-xl text-[3.25rem] font-black leading-[0.98] tracking-tight text-foreground sm:text-6xl xl:text-[6.25rem]">
            {data.heroTitle || "خطوتك تبدأ من هنا"}
          </h1>
          <p className="mt-5 max-w-lg text-2xl font-light leading-snug text-brand sm:text-3xl">
            {data.heroSubtitle || "أحذية تصنع حضورك كل يوم."}
          </p>
          <p className="mt-6 max-w-md whitespace-pre-line text-base font-light leading-8 text-foreground/65 sm:text-lg">
            {data.heroDescription || "تشكيلة منتقاة من الأحذية اليومية والرسمية،\nبخامات مريحة وتفاصيل تبقى معك."}
          </p>

          <div className="mt-9 flex flex-wrap gap-3 text-xs font-medium text-foreground/70">
            {['خامات مختارة', 'مقاسات واضحة', 'شحن موثوق'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/40 px-3 py-2">
                <Check size={14} className="text-accent" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={scrollToProducts} className="btn btn-primary btn-lg gap-3">
              {data.heroPrimaryButton || "تسوق المجموعة"}
              <ArrowLeft size={18} />
            </button>
            <button onClick={scrollToAbout} className="btn btn-outline btn-lg">
              {data.heroSecondaryButton || "قصة التفاصيل"}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="order-1 relative min-h-[58vh] overflow-hidden bg-brand lg:order-2 lg:min-h-[100dvh]"
        >
          <Image
            src="/imeg/shoes-hero.png"
            alt="حذاء جلدي أسود من مجموعة المتجر"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand/70 via-transparent to-brand/10" />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-surface sm:inset-x-8 sm:bottom-8 lg:inset-x-12 lg:bottom-12">
            <div>
              <p className="text-[10px] font-bold tracking-[0.34em] text-accent uppercase">The everyday edit</p>
              <p className="mt-2 text-sm font-light text-surface/75">تصميم هادئ. حضور واضح.</p>
            </div>
            <span className="hidden text-6xl font-black leading-none text-surface/15 sm:block">01</span>
          </div>
          <div className="absolute right-5 top-24 h-20 w-20 border-r border-t border-accent/60 sm:right-8 sm:top-32 lg:right-12" />
        </motion.div>
      </div>
    </section>
  );
}
