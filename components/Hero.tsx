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
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-paper text-ink" dir="rtl">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(28,27,25,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(28,27,25,0.045)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-copper/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[36%] hidden h-px w-[28vw] bg-ink/15 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1680px] flex-col px-5 sm:px-8 lg:px-14 xl:px-20">
        <header className="flex items-center justify-between border-b border-ink/15 py-5 text-[10px] font-bold tracking-[0.28em] uppercase sm:py-7">
          <span className="text-copper">{brandNameLatin} / Journal 01</span>
          <span className="flex items-center gap-3 text-ink/50">
            <span className="h-px w-10 bg-ink/30" />
            <span>Spring / 2026</span>
          </span>
        </header>

        <div className="grid flex-1 grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:py-14 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 flex flex-col justify-center lg:order-1"
          >
            <div className="mb-7 flex items-center gap-3 text-[10px] font-bold tracking-[0.34em] text-copper uppercase">
              <span className="h-px w-12 bg-copper" />
              <span>الفصل الأول / حضور يومي</span>
            </div>

            <p className="mb-5 text-xs font-bold tracking-[0.32em] text-ink/45 uppercase">
              {brandNameLatin} <span className="mr-2 font-normal tracking-normal text-ink/40">/ {brandName}</span>
            </p>

            <h1 className="max-w-[720px] text-[4.2rem] font-black leading-[0.88] tracking-[-0.075em] sm:text-7xl md:text-[6.5rem] xl:text-[8.2rem]">
              {data.heroTitle ? data.heroTitle : <>الخطوة<br /><span className="text-copper">تترك أثرًا.</span></>}
            </h1>

            <p className="mt-8 max-w-lg text-xl font-medium leading-[1.65] text-ink/70 sm:text-2xl">
              {data.heroSubtitle || "تصميم يسبقك بخطوة، وراحة تبقى معك."}
            </p>
            <p className="mt-4 max-w-md whitespace-pre-line text-sm leading-8 text-ink/55 sm:text-base">
              {data.heroDescription || "أحذية مختارة للذين يعرفون أن التفاصيل لا تُشرح.\nتُرى، وتُعاش."}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-[11px] font-medium text-ink/60">
              {["جلد محسوب", "مقاسات واضحة", "وصول موثوق"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check size={13} className="text-copper" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/products"
                className="group inline-flex items-center gap-4 bg-ink px-7 py-4 text-sm font-bold text-paper transition-transform duration-200 hover:-translate-y-1 active:scale-[0.98]"
              >
                {data.heroPrimaryButton || "اكتشف التشكيلة"}
                <ArrowDownLeft size={18} className="text-copper transition-transform duration-200 group-hover:-translate-x-1 group-hover:translate-y-1" />
              </Link>
              <button
                onClick={scrollToAbout}
                className="group inline-flex items-center gap-3 border-b border-ink/30 px-1 py-3 text-sm font-medium text-ink/70 transition-colors hover:border-copper hover:text-copper"
              >
                {data.heroSecondaryButton || "اقرأ بيان أثر"}
                <ArrowUpLeft size={16} />
              </button>
            </div>

            <div className="mt-12 flex items-center gap-5 border-t border-ink/15 pt-5 text-[10px] tracking-[0.22em] text-ink/40 uppercase">
              <span>01 / 04</span>
              <span className="h-px w-14 bg-copper/70" />
              <span>Objects for movement</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 relative min-h-[54svh] lg:order-2 lg:min-h-[73svh]"
          >
            <div className="absolute -right-3 -top-3 h-full w-full border border-copper/45 sm:-right-5 sm:-top-5" />
            <div className="relative h-full min-h-[54svh] overflow-hidden bg-ink lg:min-h-[73svh]">
              <Image
                src="/imeg/athr-hero-art.png"
                alt="تكوين فني لأحذية أثر"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-[1400ms] hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-ink/10" />
              <div className="absolute left-5 top-5 flex items-center gap-3 text-[9px] font-bold tracking-[0.32em] text-paper/75 uppercase sm:left-8 sm:top-8">
                <span className="h-px w-8 bg-copper" />
                <span>ATHR / FORM STUDY</span>
              </div>
              <div className="absolute bottom-6 right-6 left-6 flex items-end justify-between sm:bottom-9 sm:right-9 sm:left-9">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-copper uppercase">Quiet form / loud presence</p>
                  <p className="mt-2 text-sm text-paper/75">ثلاثة أشكال. موقف واحد.</p>
                </div>
                <span className="text-7xl font-black leading-none text-paper/20 sm:text-9xl">01</span>
              </div>
              <div className="absolute bottom-24 left-5 flex h-12 w-12 items-center justify-center border border-paper/35 text-paper/70 sm:left-8">
                <Plus size={17} strokeWidth={1.2} />
              </div>
            </div>
            <div className="absolute -bottom-7 right-7 hidden w-36 border-t border-ink/20 pt-3 text-[9px] font-bold tracking-[0.24em] text-ink/40 uppercase sm:block">
              made to be noticed
            </div>
          </motion.div>
        </div>

        <footer className="flex items-center justify-between border-t border-ink/15 py-4 text-[9px] font-bold tracking-[0.25em] text-ink/40 uppercase sm:py-5">
          <span>ATHR — أثر</span>
          <span>New objects for the everyday</span>
        </footer>
      </div>
    </section>
  );
}
