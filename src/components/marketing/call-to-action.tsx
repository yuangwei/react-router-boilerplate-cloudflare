import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function CallToAction() {
  return (
    <section className="py-14 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Start Building
          </h2>
          <p className="mt-4">Libero sapiente aliquam quibusdam aspernatur.</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/sign-up">
                <span>Get Started</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
