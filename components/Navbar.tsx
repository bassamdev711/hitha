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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { cartIconRef, triggerBounce, onBounceComplete } = useCartAnimation();
  const localRef = useRef<HTMLDivElement>(null);
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    const checkOffset = () => setTopOffset(document.getElementById("announcement-bar")?.offsetHeight || 0);
    checkOffset();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkOffset);
    const timeout = setTimeout(checkOffset, 100);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkOffset);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (localRef.current) cartIconRef.current = localRef.current;
  }, [cartIconRef]);

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
      className={`fixed z-50 w-full transition-all duration-500 ${isScrolled ? "bg-ink/90 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl" : "bg-transparent py-5"}`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10 lg:px-16">
        <Link href="/" className="group relative z-50 flex items-center gap-3 text-paper">
          <span className="text-lg font-black tracking-[-0.06em] text-copper md:text-2xl">{storeNameLatin}</span>
          <span className="border-r border-paper/25 pr-3 text-xs tracking-[0.2em] text-paper/65 md:text-sm">{storeName}</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex" dir="rtl">
          {navLinks.map((link, index) => (
            <Link key={link.name} href={link.href} className="group relative text-[11px] font-medium tracking-[0.14em] text-paper/65 transition-colors hover:text-copper">
              <span className="ml-2 text-copper/45">0{index + 1}</span>{link.name}
              <span className="absolute -bottom-2 right-0 h-px w-0 bg-copper transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="relative z-50 flex items-center gap-3 text-copper md:gap-5">
          <Link href="/track" className="hidden transition-colors hover:text-paper sm:block" aria-label="تتبع الطلب"><Package size={18} strokeWidth={1.4} /></Link>
          <Link href="/favorites" className="hidden transition-colors hover:text-paper md:block" aria-label="المفضلة"><Heart size={18} strokeWidth={1.4} /></Link>
          <button className="transition-colors hover:text-paper" aria-label="البحث" onClick={() => setIsSearchOpen(true)}><Search size={18} strokeWidth={1.4} /></button>
          <div ref={localRef} className="relative hidden md:block">
            <Link href="/cart" className="flex items-center justify-center transition-colors hover:text-paper" aria-label="سلة المشتريات">
              <motion.div animate={triggerBounce ? { scale: [1, 1.3, 1], rotate: [0, -8, 8, 0] } : {}} transition={{ duration: 0.5 }} onAnimationComplete={onBounceComplete}><ShoppingBag size={19} strokeWidth={1.4} /></motion.div>
              <AnimatePresence>{cartCount > 0 && <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-copper text-[9px] font-bold text-ink">{cartCount}</motion.span>}</AnimatePresence>
            </Link>
          </div>
          <button className="transition-colors hover:text-paper lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={isMobileMenuOpen}>{isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>

      <motion.div initial={false} animate={{ opacity: isMobileMenuOpen ? 1 : 0, pointerEvents: isMobileMenuOpen ? "auto" : "none" }} className="fixed inset-0 z-40 flex min-h-screen flex-col justify-between bg-ink px-7 py-32 backdrop-blur-xl" dir="rtl">
        <div className="space-y-5">
          <p className="mb-8 text-[10px] font-bold tracking-[0.35em] text-copper uppercase">ATHR / أثر</p>
          {navLinks.map((link, i) => (
            <motion.div key={link.name} initial={{ y: 20, opacity: 0 }} animate={isMobileMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }} transition={{ delay: i * 0.07 }}>
              <Link href={link.href} className="flex items-center justify-between border-b border-paper/10 py-4 text-3xl font-black text-paper" onClick={() => setIsMobileMenuOpen(false)}><span>{link.name}</span><ArrowUpLeft className="text-copper" size={22} /></Link>
            </motion.div>
          ))}
        </div>
        <p className="text-[10px] tracking-[0.28em] text-paper/35 uppercase">a quiet form / a clear step</p>
      </motion.div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.nav>
  );
}
