import Image from 'next/image';
import Link from 'next/link';

import { DotPattern } from '../magicui/dot-pattern';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';
import { TextEffect } from '@/components/ui/text-effect';
import { cn } from '@/lib/utils';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function Hero() {
  return (
    <section>
      <div className="relative">
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]'
          )}
        />
        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
        <div className="mx-auto max-w-6xl px-6">
          <div className="sm:mx-auto lg:mr-auto lg:mt-0">
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16"
            >
              Build and Ship 10x faster with NS
            </TextEffect>
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="mt-8 max-w-2xl text-pretty text-lg"
            >
              Tailwindcss highly customizable components for building modern
              websites and applications that look and feel the way you mean it.
            </TextEffect>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mt-12 flex items-center gap-2"
            >
              <div
                key={1}
                className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
              >
                <Button asChild size="lg" className="rounded-xl px-5 text-base">
                  <Link href="#link">
                    <span className="text-nowrap">Start Building</span>
                  </Link>
                </Button>
              </div>
              <Button
                key={2}
                asChild
                size="lg"
                variant="ghost"
                className="h-10.5 rounded-xl px-5 text-base"
              >
                <Link href="#link">
                  <span className="text-nowrap">Request a demo</span>
                </Link>
              </Button>
            </AnimatedGroup>
          </div>
        </div>
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.75,
                },
              },
            },
            ...transitionVariants,
          }}
        >
          <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
            <div
              aria-hidden
              className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
            />
            <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
              <Image
                className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                src="/mail2.webp"
                alt="app screen"
                width="2700"
                height="1440"
              />
              <Image
                className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                src="/mail2-light.webp"
                alt="app screen"
                width="2700"
                height="1440"
              />
            </div>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
