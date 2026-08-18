"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpLeft, Check, Plus } from "lucide-react";

type HeroData = {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroDescription?: string | null;
  heroPrimaryButton?: string | null;
  heroSecondaryButton?: string | null;
};

export default function Hero({
  data = {},
  brandName = "أثر",
  brandNameLatin = "ATHR",
}: {
  data?: HeroData;
  brandName?: string;
  brandNameLatin?: string;
}) {
  const scrollToAbout = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  const storedHeroTitle = data.heroTitle?.trim();
  const legacyHeroTitles = new Set(["متجرك", "متجرنا", "متحرك", "your store", "yourstore", "store name"]);
  const heroTitle = storedHeroTitle && !legacyHeroTitles.has(storedHeroTitle.toLowerCase()) ? storedHeroTitle : null;

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-ink text-paper" dir="rtl">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(244,239,231,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(244,239,231,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[34rem] w-[34rem] rounded-full bg-copper/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-[-12rem] h-[34rem] w-[34rem] rounded-full bg-copper/10 blur-[130px]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1760px] flex-col px-5 pb-4 sm:px-8 sm:pb-5 lg:px-14 xl:px-20">
        <header className="flex min-w-0 items-center justify-between gap-4 border-b border-paper/15 py-5 text-[8px] font-bold tracking-[0.2em] text-paper/65 uppercase sm:py-7 sm:text-[9px] sm:tracking-[0.28em]">
          <span className="shrink-0 text-copper">{brandNameLatin} / OBJECT 01</span>
          <span className="flex min-w-0 items-center justify-end gap-2 text-right sm:gap-3">
            <span className="h-px w-7 shrink-0 bg-copper/70 sm:w-10" />
            <span className="truncate">FORM / FUNCTION / FEELING</span>
          </span>
        </header>

        <main className="relative flex flex-1 flex-col py-8 sm:py-12 lg:py-16">
          <div className="relative z-20 min-w-0 max-w-4xl pt-1 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 flex min-w-0 items-center gap-3 text-[9px] font-bold tracking-[0.18em] text-copper uppercase sm:mb-8 sm:text-[10px] sm:tracking-[0.3em]"
            >
              <span className="h-px w-8 shrink-0 bg-copper sm:w-12" />
              <span className="leading-5">الفصل الأول / حضور لا يحتاج شرحًا</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[11ch] break-words text-[clamp(3.75rem,19vw,7rem)] font-black leading-[0.9] tracking-[-0.055em] sm:max-w-5xl sm:text-8xl md:text-[8.8rem] lg:text-[10.5rem] xl:text-[12rem]"
            >
              {heroTitle ? heroTitle : <>امشِ<br /><span className="text-copper">بطريقتك.</span></>}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-6 max-w-[18rem] text-base font-medium leading-[1.8] text-paper/75 sm:mt-8 sm:max-w-md sm:text-2xl"
            >
              {data.heroSubtitle || "أحذية لا تلاحق الاتجاه. تصنع حضورك حين تخطو."}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto mt-9 h-[min(58svh,30rem)] w-full max-w-[21rem] sm:mt-10 sm:h-[58vh] sm:max-w-[28rem] lg:absolute lg:left-[27%] lg:top-[12%] lg:mx-0 lg:mt-0 lg:h-[64vh] lg:w-[min(38vw,590px)] lg:-translate-x-1/2"
          >
            <div className="absolute -inset-3 border border-copper/45 sm:-inset-6" />
            <div className="relative h-full w-full overflow-hidden bg-[#11100F] shadow-[24px_30px_80px_rgba(0,0,0,0.42)]">
              <Image
                src="/imeg/athr-hero-art.png"
                alt="تكوين فني لأحذية أثر"
                fill
                priority
                sizes="(max-width: 639px) 84vw, (max-width: 1023px) 72vw, 38vw"
                className="object-cover object-center saturate-[0.82] transition-transform duration-[1600ms] hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/15" />
              <div className="absolute left-4 top-4 flex items-center gap-2 text-[8px] font-bold tracking-[0.2em] text-paper/75 uppercase sm:left-7 sm:top-7 sm:gap-3 sm:text-[9px] sm:tracking-[0.28em]">
                <span className="h-px w-6 bg-copper sm:w-8" />
                <span>ATHR / MATERIAL STUDY</span>
              </div>
              <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between sm:bottom-7 sm:right-7 sm:left-7">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.2em] text-copper uppercase sm:text-[10px] sm:tracking-[0.28em]">Quiet form / clear step</p>
                  <p className="mt-2 text-xs text-paper/75 sm:text-sm">قطعة تتحرك معك.</p>
                </div>
                <span className="text-6xl font-black leading-none text-paper/20 sm:text-9xl">01</span>
              </div>
              <div className="absolute bottom-20 left-4 flex h-10 w-10 items-center justify-center border border-paper/35 text-paper/70 sm:bottom-24 sm:left-7 sm:h-11 sm:w-11">
                <Plus size={16} strokeWidth={1.2} />
              </div>
            </div>
          </motion.div>

          <div className="relative z-20 mt-10 flex flex-col gap-8 sm:mt-12 lg:mt-auto lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="max-w-sm"
            >
              <p className="whitespace-pre-line text-sm leading-8 text-paper/55 sm:text-base">
                {data.heroDescription || "اختيارات صُممت للعين قبل أن تصل إلى القدم.\nجلد، توازن، وتفاصيل تبقى."}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 text-[10px] font-medium text-paper/60 sm:mt-6 sm:gap-x-5">
                {["جلد محسوب", "مقاسات واضحة", "وصول موثوق"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check size={12} className="text-copper" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <Link
                href="/products"
                className="group inline-flex min-h-12 items-center gap-3 bg-paper px-5 py-3 text-sm font-bold text-ink transition-transform duration-200 hover:-translate-y-1 active:scale-[0.98] sm:gap-4 sm:px-7 sm:py-4"
              >
                {data.heroPrimaryButton || "اكتشف التشكيلة"}
                <ArrowDownLeft size={18} className="text-copper transition-transform duration-200 group-hover:-translate-x-1 group-hover:translate-y-1" />
              </Link>
              <button
                onClick={scrollToAbout}
                className="group inline-flex min-h-12 items-center gap-3 border-b border-paper/35 px-1 py-3 text-sm font-medium text-paper/75 transition-colors hover:border-copper hover:text-copper"
              >
                {data.heroSecondaryButton || "اقرأ بيان أثر"}
                <ArrowUpLeft size={16} />
              </button>
            </motion.div>
          </div>
        </main>

        <footer className="flex min-w-0 items-center justify-between gap-4 border-t border-paper/15 py-4 text-[8px] font-bold tracking-[0.18em] text-paper/45 uppercase sm:py-5 sm:text-[9px] sm:tracking-[0.25em]">
          <span className="shrink-0">{brandNameLatin} — {brandName}</span>
          <span className="truncate text-right">New objects for the everyday</span>
        </footer>
      </div>
    </section>
  );
}
