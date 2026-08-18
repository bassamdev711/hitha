"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Ruler, ShieldCheck } from "lucide-react";

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
  brandName = 'متجرك',
}: {
  data?: ExperienceData
  brandName?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="experience" className="relative overflow-hidden bg-white py-24 md:py-32" ref={containerRef} dir="rtl">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <span className="mb-4 block text-xs font-bold tracking-[0.35em] text-accent uppercase">
            {data.expTopTitle || "ما يميّز التجربة"}
          </span>
          <h2 className="text-4xl font-black leading-tight text-foreground md:text-5xl">
            {data.expMainTitle || `تفاصيل تليق بخطوتك`}
          </h2>
          <div className="mt-6 h-1 w-16 bg-brand" />
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-24">
          <motion.div style={{ y: y1 }} className="space-y-6">
            <div className="border-r-2 border-brand bg-surface p-7 shadow-sm md:p-10">
              <Ruler className="mb-6 text-accent" size={28} strokeWidth={1.5} />
              <h3 className="mb-3 text-2xl font-black text-foreground">
                {data.expBox1Title || "مقاس يشرح نفسه"}
              </h3>
              <p className="text-lg font-light leading-8 text-foreground/70">
                {data.expBox1Desc || "تفاصيل واضحة للمقاسات والخامات تساعدك على اختيار الحذاء المناسب من أول مرة."}
              </p>
            </div>

            <div className="mr-0 border-l-2 border-accent bg-brand p-7 text-surface shadow-sm md:mr-12 md:p-10">
              <ShieldCheck className="mb-6 text-accent" size={28} strokeWidth={1.5} />
              <h3 className="mb-3 text-2xl font-black">
                {data.expBox2Title || "راحة تصل معك"}
              </h3>
              <p className="text-lg font-light leading-8 text-surface/70">
                {data.expBox2Desc || "من التغليف إلى التوصيل والمتابعة، نحافظ على تجربة بسيطة وموثوقة تشبه جودة المنتج."}
              </p>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="relative hidden h-[600px] w-full md:block">
            <div className="absolute inset-0 translate-x-5 translate-y-5 border border-accent/30" />
            <div className="absolute inset-0 bg-surface p-4 shadow-2xl">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/imeg/shoes-experience.png"
                  alt={`حذاء من تجربة ${brandName}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-brand/10 mix-blend-multiply" />
                <div className="absolute bottom-5 right-5 bg-surface/90 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[10px] font-bold tracking-[0.3em] text-brand uppercase">03 / details</p>
                  <p className="mt-1 text-sm text-foreground">جودة تُرى وتُحس.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
