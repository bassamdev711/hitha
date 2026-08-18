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

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-ink text-paper" dir="rtl">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(244,239,231,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(244,239,231,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[34rem] w-[34rem] rounded-full bg-copper/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-[-12rem] h-[34rem] w-[34rem] rounded-full bg-copper/10 blur-[130px]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1760px] flex-col px-5 sm:px-8 lg:px-14 xl:px-20">
        <header className="flex items-center justify-between border-b border-paper/15 py-5 text-[9px] font-bold tracking-[0.28em] text-paper/65 uppercase sm:py-7">
          <span className="text-copper">{brandNameLatin} / OBJECT 01</span>
          <span className="flex items-center gap-3">
            <span className="h-px w-10 bg-copper/70" />
            <span>FORM / FUNCTION / FEELING</span>
          </span>
        </header>

        <main className="relative flex flex-1 flex-col justify-between py-10 sm:py-14 lg:py-16">
          <div className="relative z-20 max-w-4xl pt-2 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-copper uppercase"
            >
              <span className="h-px w-12 bg-copper" />
              <span>الفصل الأول / حضور لا يحتاج شرحًا</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl text-[4.1rem] font-black leading-[0.82] tracking-[-0.09em] sm:text-8xl md:text-[8.8rem] lg:text-[10.5rem] xl:text-[12rem]"
            >
              {data.heroTitle ? data.heroTitle : <>امشِ<br /><span className="text-copper">بطريقتك.</span></>}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-8 max-w-md text-lg font-medium leading-[1.7] text-paper/75 sm:text-2xl"
            >
              {data.heroSubtitle || "أحذية لا تلاحق الاتجاه. تصنع حضورك حين تخطو."}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-1/2 top-[11rem] z-10 h-[44vh] w-[min(72vw,560px)] -translate-x-1/2 sm:top-[8rem] sm:h-[58vh] lg:left-[27%] lg:top-[12%] lg:h-[64vh] lg:w-[min(38vw,590px)] lg:-translate-x-1/2"
          >
            <div className="absolute -inset-4 border border-copper/45 sm:-inset-6" />
            <div className="relative h-full w-full overflow-hidden bg-[#11100F] shadow-[24px_30px_80px_rgba(0,0,0,0.42)]">
              <Image
                src="/imeg/athr-hero-art.png"
                alt="تكوين فني لأحذية أثر"
                fill
                priority
                sizes="(max-width: 1023px) 72vw, 38vw"
                className="object-cover object-center saturate-[0.82] transition-transform duration-[1600ms] hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/15" />
              <div className="absolute left-5 top-5 flex items-center gap-3 text-[9px] font-bold tracking-[0.28em] text-paper/75 uppercase sm:left-7 sm:top-7">
                <span className="h-px w-8 bg-copper" />
                <span>ATHR / MATERIAL STUDY</span>
              </div>
              <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between sm:bottom-7 sm:right-7 sm:left-7">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.28em] text-copper uppercase">Quiet form / clear step</p>
                  <p className="mt-2 text-sm text-paper/75">قطعة تتحرك معك.</p>
                </div>
                <span className="text-7xl font-black leading-none text-paper/20 sm:text-9xl">01</span>
              </div>
              <div className="absolute bottom-24 left-5 flex h-11 w-11 items-center justify-center border border-paper/35 text-paper/70 sm:left-7">
                <Plus size={17} strokeWidth={1.2} />
              </div>
            </div>
          </motion.div>

          <div className="relative z-20 mt-[22rem] flex flex-col justify-between gap-8 sm:mt-[27rem] lg:mt-0 lg:flex-row lg:items-end">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="max-w-sm"
            >
              <p className="whitespace-pre-line text-sm leading-8 text-paper/55 sm:text-base">
                {data.heroDescription || "اختيارات صُممت للعين قبل أن تصل إلى القدم.\nجلد، توازن، وتفاصيل تبقى."}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-[10px] font-medium text-paper/60">
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
              className="flex flex-wrap items-center gap-5"
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-4 bg-paper px-7 py-4 text-sm font-bold text-ink transition-transform duration-200 hover:-translate-y-1 active:scale-[0.98]"
              >
                {data.heroPrimaryButton || "اكتشف التشكيلة"}
                <ArrowDownLeft size={18} className="text-copper transition-transform duration-200 group-hover:-translate-x-1 group-hover:translate-y-1" />
              </Link>
              <button
                onClick={scrollToAbout}
                className="group inline-flex items-center gap-3 border-b border-paper/35 px-1 py-3 text-sm font-medium text-paper/75 transition-colors hover:border-copper hover:text-copper"
              >
                {data.heroSecondaryButton || "اقرأ بيان أثر"}
                <ArrowUpLeft size={16} />
              </button>
            </motion.div>
          </div>
        </main>

        <footer className="flex items-center justify-between border-t border-paper/15 py-4 text-[9px] font-bold tracking-[0.25em] text-paper/45 uppercase sm:py-5">
          <span>{brandNameLatin} — {brandName}</span>
          <span>New objects for the everyday</span>
        </footer>
      </div>
    </section>
  );
}
