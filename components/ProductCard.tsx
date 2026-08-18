"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft, ShoppingBag } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { useCart } from './CartProvider';
import { useToast } from './ToastProvider';
import { getImageSizes } from '@/lib/image-utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice: number | null;
    imageUrl: string;
    engName?: string;
    brand?: string;
  };
  currency: string;
  priority?: boolean;
}

export default function ProductCard({ product, currency, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      maxStock: 99,
    });
    showToast('success', 'تمت الإضافة إلى السلة بنجاح');
  };

  return (
    <article className="group relative flex min-h-[430px] flex-col overflow-hidden bg-[#e3ddd3] text-ink transition-transform duration-500 hover:-translate-y-2 md:min-h-[560px]">
      <div className="absolute inset-x-5 top-5 z-20 flex items-center justify-between text-[10px] font-bold tracking-[0.25em] text-ink/45 uppercase md:inset-x-7 md:top-7">
        <span>edit / 0{priority ? '1' : '2'}</span>
        <FavoriteButton product={product} className="m-0 text-ink/70" />
      </div>

      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={`عرض ${product.name}`} />
      <div className="relative min-h-[280px] flex-1 overflow-hidden md:min-h-[355px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.55),transparent_35%)]" />
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes={getImageSizes('card')}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            className="z-0 object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl font-black tracking-tight text-copper/20">ATHR</div>
        )}
        <div className="absolute bottom-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 bg-paper/60 text-ink opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100"><ArrowUpLeft size={17} /></div>
      </div>

      <div className="relative z-20 border-t border-ink/15 bg-paper/55 p-5 backdrop-blur-sm md:p-7" dir="rtl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[9px] font-bold tracking-[0.23em] text-copper uppercase">{product.engName || product.brand || 'ATHR / everyday form'}</p>
            <h3 className="text-xl font-black tracking-[-0.03em] text-ink md:text-2xl">{product.name}</h3>
          </div>
          <p className="shrink-0 pt-1 text-sm font-bold text-ink">{Number(product.price).toLocaleString('ar-SA')} <span className="text-[10px] text-ink/45">{currency}</span></p>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          {product.compareAtPrice ? <p className="text-xs text-ink/35 line-through">{Number(product.compareAtPrice).toLocaleString('ar-SA')}</p> : <span />}
          <button onClick={handleAddToCart} className="group/btn relative z-30 inline-flex items-center gap-2 border-b border-ink/30 pb-2 text-xs font-bold text-ink transition-colors hover:border-copper hover:text-copper">
            <ShoppingBag size={14} />
            أضف إلى اختياراتي
          </button>
        </div>
      </div>
    </article>
  );
}
