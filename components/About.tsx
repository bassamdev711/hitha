"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownLeft } from "lucide-react";

type AboutData = {
  aboutTopTitle?: string | null
  aboutMainTitle?: string | null
  aboutQuote?: string | null
  aboutDescription?: string | null
}

export default function About({
  data = {},
  brandName = 'أثر',
}: {
  data?: AboutData
  brandName?: string
}) {
  return (
    <section id="about" className="relative overflow-hidden bg-ink py-16 text-paper sm:py-24 md:py-36" dir="rtl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(198,128,69,0.16),transparent_25%)]" />
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 sm:gap-14 sm:px-6 md:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-7">
          <p className="mb-6 text-[9px] font-bold tracking-[0.24em] text-copper uppercase sm:mb-8 sm:text-[10px] sm:tracking-[0.4em]">03 / the point of view</p>
          <h2 className="max-w-full whitespace-pre-line text-[clamp(3rem,15vw,5rem)] font-black leading-[0.95] tracking-[-0.055em] sm:max-w-5xl sm:text-7xl lg:text-[8rem]">
            {data.aboutMainTitle || "نصمّم\nما يبقى."}
          </h2>
          <div className="mt-8 grid gap-6 border-t border-paper/15 pt-6 sm:mt-10 sm:gap-8 sm:pt-7 md:grid-cols-[1fr_1.2fr]">
            <p className="text-xl font-light leading-relaxed text-copper md:text-2xl">
              {data.aboutQuote || 'كل خطوة تستحق حذاءً يليق بها.'}
            </p>
            <div>
              <p className="mb-7 max-w-xl text-sm leading-8 text-paper/60 md:text-base">
                {data.aboutDescription || `في ${brandName} لا نطارد الضجيج. نبحث عن الشكل الذي يظل جميلًا بعد يوم طويل، والخامة التي تتحسن مع الوقت، والتفصيل الذي لا تراه إلا عندما تقترب.`}
              </p>
              <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-paper/50 uppercase">
                crafted for the everyday
                <ArrowDownLeft size={16} className="text-copper" />
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative min-h-[22rem] sm:min-h-[30rem] lg:col-span-5 lg:min-h-[690px]">
          <div className="absolute inset-0 translate-x-4 translate-y-4 border border-copper/45" />
          <div className="absolute inset-0 overflow-hidden bg-paper p-3">
            <div className="relative h-full w-full overflow-hidden">
              <Image src="/imeg/athr-after-dark.png" alt={`تكوين فني من هوية ${brandName}`} fill sizes="(max-width: 1024px) 100vw, 38vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between text-paper">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.34em] text-copper uppercase">after dark / 02</p>
                  <p className="mt-2 text-sm text-paper/75">حضور هادئ، أثر واضح.</p>
                </div>
                <span className="text-6xl font-black text-paper/20">∞</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
