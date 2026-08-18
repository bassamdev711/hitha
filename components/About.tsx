"use client";

import { motion } from "framer-motion";

type AboutData = {
  aboutTopTitle?: string | null
  aboutMainTitle?: string | null
  aboutQuote?: string | null
  aboutDescription?: string | null
}

export default function About({
  data = {},
  brandName = 'متجرك',
}: {
  data?: AboutData
  brandName?: string
}) {
  return (
    <section id="about" className="relative overflow-hidden bg-brand py-20 md:py-28" dir="rtl">
      <div className="absolute inset-0 bg-[url('/imeg/shoes-about.png')] bg-cover bg-center opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-l from-brand/95 via-brand/78 to-brand/40" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-brand/75 to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[540px] max-w-7xl items-center gap-12 px-6 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="mb-6 block text-xs font-bold tracking-[0.35em] text-accent uppercase">
            {data.aboutTopTitle || `هوية ${brandName}`}
          </span>
          <h2 className="mb-7 text-4xl font-black leading-tight text-surface md:text-6xl">
            {data.aboutMainTitle || "نصنع الفرق في التفاصيل"}
          </h2>
          <div className="mb-8 h-px w-16 bg-accent" />
          <p className="mb-7 text-2xl font-light leading-tight text-surface/95 md:text-4xl">
            {data.aboutQuote || 'كل خطوة تستحق حذاءً يليق بها.'}
          </p>
          <p className="max-w-xl text-base font-light leading-8 text-surface/70 md:text-lg">
            {data.aboutDescription || 'نختار تصاميمنا حول راحة القدم وشكلها، ونمنح كل خامة ومساحة وخياطة وقتها حتى تصل إليك قطعة ترافقك بثقة من أول خطوة.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="hidden justify-self-end lg:block"
        >
          <div className="border border-accent/40 p-4 backdrop-blur-sm">
            <div className="border border-surface/20 px-8 py-10 text-center">
              <span className="text-7xl font-black leading-none text-surface/10">02</span>
              <p className="mt-6 text-xs font-bold tracking-[0.3em] text-accent uppercase">Made for your pace</p>
              <p className="mt-3 text-sm leading-7 text-surface/65">خامات تلمسها. تصميم تراه. راحة تشعر بها.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 h-8 w-8 border-b border-r border-accent/60" />
      <div className="absolute left-8 top-8 h-8 w-8 border-l border-t border-accent/60" />
    </section>
  );
}
