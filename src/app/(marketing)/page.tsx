import React from 'react';

import CallToAction from '@/components/marketing/call-to-action';
import FAQs from '@/components/marketing/faqs';
import Features from '@/components/marketing/features-1';
import Hero from '@/components/marketing/hero';
import Pricing from '@/components/marketing/pricing-cards';
import StatsSection from '@/components/marketing/stats';
import WallOfLoveSection from '@/components/marketing/testimonials';

export default function Page() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Features />
      <StatsSection />
      <WallOfLoveSection />
      <Pricing />
      <FAQs />
      <CallToAction />
    </main>
  );
}
