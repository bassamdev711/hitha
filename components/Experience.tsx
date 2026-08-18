"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Ruler, ShieldCheck, Sparkles } from "lucide-react";

type ExperienceData = {
  expTopTitle?: string | null
  expMainTitle?: string | null
  expBox1Title?: string | null
  expBox1Desc?: string | null
  expBox2Title?: string | null
  expBox2Desc?: string | null
}

export default function Experience({
  data = {},
  brandName = 'أثر',
}: {
  data?: ExperienceData
  brandName?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [25, -35]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  return (
    <section id="experience" ref={containerRef} className="relative overflow-hidden bg-paper py-16 sm:py-24 md:py-36" dir="rtl">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-6 md:px-10 lg:px-16">
        <div className="mb-10 flex flex-col justify-between gap-5 border-t border-ink/15 pt-5 sm:mb-14 sm:pt-6 md:mb-20 md:flex-row md:items-start">
          <div>
            <p className="mb-4 text-[9px] font-bold tracking-[0.24em] text-copper uppercase sm:mb-5 sm:text-[10px] sm:tracking-[0.4em]">04 / construction notes</p>
            <h2 className="max-w-full whitespace-pre-line text-[clamp(3rem,14vw,5rem)] font-black leading-[0.96] tracking-[-0.05em] text-ink sm:max-w-3xl sm:text-6xl md:text-8xl">
              {data.expMainTitle || "الجودة\nتُقرأ باللمس."}
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-ink/55 sm:leading-8 md:pt-3 md:text-base">
            {data.expTopTitle || "ما يميّز التجربة"}<br />نحوّل التفاصيل غير المرئية إلى راحة تشعر بها طوال اليوم.
          </p>
        </div>

        <div className="grid items-start gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.div style={{ y: y1 }} className="space-y-5 lg:col-span-5">
            <article className="border-r-2 border-copper bg-white p-7 shadow-[0_24px_70px_rgba(18,18,18,0.08)] md:p-10">
              <Ruler className="mb-7 text-copper" size={27} strokeWidth={1.3} />
              <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-ink/40 uppercase">fit / 01</p>
              <h3 className="mb-4 text-2xl font-black text-ink">{data.expBox1Title || "مقاس يشرح نفسه"}</h3>
              <p className="text-base leading-8 text-ink/60">{data.expBox1Desc || "تفاصيل صريحة للمقاسات والخامات تساعدك على اختيار الحذاء المناسب من أول مرة، دون تخمين."}</p>
            </article>
            <article className="mr-0 border-l-2 border-ink bg-ink p-7 text-paper shadow-[0_24px_70px_rgba(18,18,18,0.12)] md:mr-16 md:p-10">
              <ShieldCheck className="mb-7 text-copper" size={27} strokeWidth={1.3} />
              <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-paper/35 uppercase">care / 02</p>
              <h3 className="mb-4 text-2xl font-black">{data.expBox2Title || "راحة تصل معك"}</h3>
              <p className="text-base leading-8 text-paper/60">{data.expBox2Desc || "من التغليف إلى التوصيل والمتابعة، نحافظ على تجربة بسيطة وموثوقة تشبه جودة المنتج."}</p>
            </article>
          </motion.div>

          <motion.div style={{ y: y2 }} className="relative lg:col-span-7">
            <div className="relative aspect-[1/1.08] overflow-hidden bg-ink p-2.5 sm:aspect-[1.35/1] sm:p-3 md:p-5">
              <Image src="/imeg/athr-materials.png" alt={`مواد صناعة أحذية ${brandName}`} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between gap-4 text-paper sm:bottom-6 sm:right-6 sm:left-6 md:bottom-8 md:right-8 md:left-8">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-copper"><Sparkles size={15} /><span className="text-[10px] font-bold tracking-[0.3em] uppercase">material study</span></div>
                  <p className="text-xl font-black leading-tight sm:text-2xl md:text-4xl">الخامة قبل الزينة</p>
                </div>
                <span className="text-[10px] tracking-[0.3em] text-paper/45 uppercase">04 / details</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
