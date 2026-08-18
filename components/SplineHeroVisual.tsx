"use client";

import Image from "next/image";
import { createElement, useEffect, useRef, useState } from "react";

const sceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL?.trim();

export default function SplineHeroVisual() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewerLoaded, setViewerLoaded] = useState(false);

  useEffect(() => {
    if (!sceneUrl || !mountRef.current) return;
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cancelScheduledLoad: (() => void) | undefined;
    let observer: IntersectionObserver | undefined;

    const loadViewer = () => {
      if (cancelled) return;

      const existingScript = document.querySelector(
        'script[data-athr-spline-viewer="true"]',
      ) as HTMLScriptElement | null;

      if (existingScript) {
        if (customElements.get("spline-viewer")) setViewerLoaded(true);
        else existingScript.addEventListener("load", () => setViewerLoaded(true), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js";
      script.dataset.athrSplineViewer = "true";
      script.onload = () => {
        if (!cancelled) setViewerLoaded(true);
      };
      document.head.appendChild(script);
    };

    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === "function") {
        const requestId = window.requestIdleCallback(loadViewer, { timeout: 1800 });
        cancelScheduledLoad = () => window.cancelIdleCallback(requestId);
      } else {
        const timeoutId = globalThis.setTimeout(loadViewer, 700);
        cancelScheduledLoad = () => globalThis.clearTimeout(timeoutId);
      }
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        scheduleLoad();
        observer?.disconnect();
      },
      { rootMargin: "160px" },
    );
    observer.observe(mountRef.current);

    return () => {
      cancelled = true;
      observer?.disconnect();
      cancelScheduledLoad?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute bottom-8 left-6 z-20 h-36 w-[min(48vw,18rem)] overflow-hidden border border-paper/20 bg-ink/45 shadow-2xl backdrop-blur-[2px] sm:bottom-10 sm:left-10 sm:h-44 sm:w-72 lg:bottom-14 lg:left-14"
      aria-label="معاينة ثلاثية الأبعاد لحذاء أثر"
    >
      <Image
        src="/imeg/athr-spline-low-poly.webp"
        alt="معاينة فنية منخفضة التفاصيل لحذاء أثر"
        fill
        sizes="(max-width: 639px) 48vw, 18rem"
        className={`object-cover transition-opacity duration-700 ${viewerLoaded ? "opacity-0" : "opacity-100"}`}
      />
      {viewerLoaded &&
        createElement("spline-viewer", {
          url: sceneUrl,
          loading: "lazy",
          className: "absolute inset-0 h-full w-full",
          "aria-hidden": true,
        })}
      <div className="pointer-events-none absolute inset-x-3 bottom-2 flex items-center justify-between text-[8px] font-bold tracking-[0.22em] text-paper/65 uppercase">
        <span>Low poly study</span>
        <span className="text-copper">ATHR / 01</span>
      </div>
    </div>
  );
}
