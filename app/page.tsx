import dynamic from 'next/dynamic'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";

// Server Components can be directly imported if they are lightweight, 
// but we want to stream them or lazy load client components.
import CollectionsSection from "@/components/CollectionsSection";
import ProductsServer from "@/components/ProductsServer";
import { getHomepageSettings } from "@/app/actions/homepage";
import prisma from "@/lib/prisma";
import CampaignBanner from "@/components/CampaignBanner";
import EditorialMosaic from "@/components/EditorialMosaic";
import { getStoreConfig } from "@/lib/store-config";

// Dynamic Imports for components below the fold (Lazy Loading)
const Experience = dynamic(() => import("@/components/Experience"), { ssr: true })
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true })
const Newsletter = dynamic(() => import("@/components/Newsletter"), { ssr: true })
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true })
const Stats = dynamic(() => import("@/components/Stats"), { ssr: true })

export default async function Home() {
  const [store, { data: settings }] = await Promise.all([
    getStoreConfig(),
    getHomepageSettings(),
  ]);
  const safeSettings = settings || {};

  let activeCampaign: Awaited<ReturnType<typeof prisma.campaign.findFirst>> = null
  try {
    activeCampaign = await prisma.campaign.findFirst({
      where: {
        isActive: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch {
    // Render the homepage without a campaign when the database is unavailable.
  }

  return (
    <main className="min-h-screen bg-surface text-foreground overflow-hidden font-sans">
      <Navbar storeName={store.name} storeNameLatin={store.nameLatin} />
      
      {/* 1. Store Identity */}
      <Hero data={safeSettings} brandName={store.name} brandNameLatin={store.nameLatin} />
      
      {/* Campaign Banner (if any) */}
      {activeCampaign && <CampaignBanner campaign={activeCampaign} />}
      
      {/* 2. Manifesto */}
      <About data={safeSettings} brandName={store.name} />

      {/* 3. Editorial interlude */}
      <EditorialMosaic brandName={store.name} />

      {/* 4. Collection index */}
      <CollectionsSection brandName={store.name} />

      {/* 5. Bestsellers */}
      <ProductsServer
        type="bestsellers"
        title="القطع التي بدأت بها الحكاية"
        subtitle="أحذية يختارها من يعرف قيمة التفاصيل"
      />

      {/* 6. Seasonal edit */}
      <ProductsServer
        type="offers"
        title="تحرير الموسم"
        subtitle="ألوان وملامس جديدة، بلا ضجيج"
      />

      {/* 7. Handpicked edit */}
      <ProductsServer
        type="featured"
        title="اختيارات المحرر"
        subtitle={`ترشيحات ${store.name} للخطوة القادمة`}
      />
      
      {/* 7. Why trust us */}
      <Experience data={safeSettings} brandName={store.name} />
      
      {/* 8. Stats (Social Proof) */}
      <Stats data={safeSettings} />
      
      {/* 9. Testimonials */}
      <Testimonials />
      
      {/* 10. Call to action */}
      <Newsletter storeName={store.name} />
      <Contact />
      
      <Footer storeName={store.name} storeNameLatin={store.nameLatin} />
    </main>
  );
}
