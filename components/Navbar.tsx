"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, Package, Heart, ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import SearchModal from "./SearchModal";
import { useCartAnimation } from "./CartAnimationProvider";

export default function Navbar({
  storeName = 'أثر',
  storeNameLatin = 'ATHR',
}: {
  storeName?: string
  storeNameLatin?: string
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { cartIconRef, triggerBounce, onBounceComplete } = useCartAnimation();
  const localRef = useRef<HTMLDivElement>(null);
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const checkOffset = () => setTopOffset(document.getElementById("announcement-bar")?.offsetHeight || 0);
    checkOffset();
    window.addEventListener("resize", checkOffset);
    const timeout = setTimeout(checkOffset, 100);
    return () => {
      window.removeEventListener("resize", checkOffset);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (localRef.current) cartIconRef.current = localRef.current;
  }, [cartIconRef]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "الفهرس", href: "/products" },
    { name: "التصنيفات", href: "/products" },
    { name: "فلسفة أثر", href: "/#about" },
    { name: "التفاصيل", href: "/#experience" },
  ];

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ top: topOffset }}
      className="fixed z-50 w-full border-b border-paper/10 bg-ink/95 py-4 text-paper shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-500"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10 lg:px-16">
        <Link href="/" className="group relative z-50 flex items-center gap-3 text-paper">
          <span className="text-lg font-black tracking-[-0.06em] text-copper md:text-2xl">{storeNameLatin}</span>
          <span className="border-r border-paper/25 pr-3 text-xs tracking-[0.2em] text-paper/75 md:text-sm">{storeName}</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex" dir="rtl">
          {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="group relative text-[11px] font-semibold tracking-[0.14em] text-paper/85 transition-colors hover:text-copper">
                {link.name}
              <span className="absolute -bottom-2 right-0 h-px w-0 bg-copper transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="relative z-50 flex items-center gap-3 text-copper md:gap-5">
          <Link href="/track" className="hidden text-paper/90 transition-colors hover:text-copper sm:block" aria-label="تتبع الطلب"><Package size={18} strokeWidth={1.6} /></Link>
          <Link href="/favorites" className="hidden text-paper/90 transition-colors hover:text-copper md:block" aria-label="المفضلة"><Heart size={18} strokeWidth={1.6} /></Link>
          <button className="text-paper/90 transition-colors hover:text-copper" aria-label="البحث" onClick={() => setIsSearchOpen(true)}><Search size={18} strokeWidth={1.6} /></button>
          <div ref={localRef} className="relative hidden md:block">
            <Link href="/cart" className="flex items-center justify-center text-paper/90 transition-colors hover:text-copper" aria-label="سلة المشتريات">
              <motion.div animate={triggerBounce ? { scale: [1, 1.3, 1], rotate: [0, -8, 8, 0] } : {}} transition={{ duration: 0.5 }} onAnimationComplete={onBounceComplete}><ShoppingBag size={19} strokeWidth={1.4} /></motion.div>
              <AnimatePresence>{cartCount > 0 && <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-copper text-[9px] font-bold text-ink">{cartCount}</motion.span>}</AnimatePresence>
            </Link>
          </div>
          <button className="text-paper/90 transition-colors hover:text-copper lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={isMobileMenuOpen}>{isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>

      <motion.div initial={false} animate={{ opacity: isMobileMenuOpen ? 1 : 0, pointerEvents: isMobileMenuOpen ? "auto" : "none" }} className="fixed inset-0 z-40 flex h-[100dvh] flex-col overflow-y-auto overscroll-contain bg-ink px-6 pb-8 pt-24 backdrop-blur-xl sm:px-8 sm:pb-10 sm:pt-32" dir="rtl">
        <div className="my-auto w-full space-y-2 py-6">
          <p className="mb-7 text-[10px] font-bold tracking-[0.35em] text-copper uppercase sm:mb-9">ATHR / أثر</p>
          {navLinks.map((link, i) => (
            <motion.div key={link.name} initial={{ y: 20, opacity: 0 }} animate={isMobileMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }} transition={{ delay: i * 0.07 }}>
              <Link href={link.href} className="flex min-h-14 items-center justify-between gap-5 border-b border-paper/10 py-3 text-[clamp(1.65rem,7vw,2.25rem)] font-black leading-[1.25] text-paper" onClick={() => setIsMobileMenuOpen(false)}><span className="min-w-0">{link.name}</span><ArrowUpLeft className="shrink-0 text-copper" size={20} /></Link>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 shrink-0 text-[9px] tracking-[0.2em] text-paper/35 uppercase sm:text-[10px] sm:tracking-[0.28em]">a quiet form / a clear step</p>
      </motion.div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.nav>
  );
}
