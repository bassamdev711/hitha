import { cache } from 'react'
import prisma from '@/lib/prisma'

export type StoreConfig = {
  name: string
  nameLatin: string
  tagline: string
  description: string
  logoUrl: string | null
  faviconUrl: string | null
  ogImageUrl: string | null
  storeUrl: string | null
  locale: string
  currencyCode: string
}

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  name: 'أثر',
  nameLatin: 'ATHR',
  tagline: 'أحذية تُصاغ كأثرٍ يبقى.',
  description: 'أثر / ATHR: متجر أحذية فاخر يقدّم تصاميم منتقاة بخامات راقية وحضور هادئ.',
  logoUrl: null,
  faviconUrl: null,
  ogImageUrl: null,
  storeUrl: null,
  locale: 'ar',
  currencyCode: 'USD',
}

type StoreSettingsRecord = {
  storeName: string | null
  storeNameLatin: string | null
  storeTagline: string | null
  storeDescription: string | null
  logoUrl: string | null
  faviconUrl: string | null
  ogImageUrl: string | null
  storeUrl: string | null
  locale: string
  currencyCode: string
}

const PLACEHOLDER_BRANDS = new Set(['متجرك', 'متجرنا', 'your store', 'yourstore', 'store name'])

function brandValue(value: string | null | undefined, fallback: string): string {
  const cleaned = value?.trim() || ''
  return cleaned && !PLACEHOLDER_BRANDS.has(cleaned.toLowerCase()) ? cleaned : fallback
}

function normalizeStoreConfig(settings: StoreSettingsRecord | null | undefined): StoreConfig {
  return {
    ...DEFAULT_STORE_CONFIG,
    name: brandValue(settings?.storeName, DEFAULT_STORE_CONFIG.name),
    nameLatin: brandValue(settings?.storeNameLatin, DEFAULT_STORE_CONFIG.nameLatin),
    tagline: settings?.storeTagline?.trim() || DEFAULT_STORE_CONFIG.tagline,
    description: settings?.storeDescription?.trim() || DEFAULT_STORE_CONFIG.description,
    logoUrl: settings?.logoUrl || null,
    faviconUrl: settings?.faviconUrl || null,
    ogImageUrl: settings?.ogImageUrl || null,
    storeUrl: settings?.storeUrl || null,
    locale: settings?.locale || DEFAULT_STORE_CONFIG.locale,
    currencyCode: settings?.currencyCode || DEFAULT_STORE_CONFIG.currencyCode,
  }
}

export const getStoreConfig = cache(async (): Promise<StoreConfig> => {
  try {
    const settings = await prisma.storeSettings.findUnique({
      where: { id: 'singleton' },
      select: {
        storeName: true,
        storeNameLatin: true,
        storeTagline: true,
        storeDescription: true,
        logoUrl: true,
        faviconUrl: true,
        ogImageUrl: true,
        storeUrl: true,
        locale: true,
        currencyCode: true,
      },
    })

    return normalizeStoreConfig(settings)
  } catch {
    return DEFAULT_STORE_CONFIG
  }
})

export function getSiteUrl(storeUrl?: string | null): URL {
  const candidate = storeUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://hitha711.vercel.app'
  try {
    return new URL(candidate)
  } catch {
    return new URL('https://hitha711.vercel.app')
  }
}
