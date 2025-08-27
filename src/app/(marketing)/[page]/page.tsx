import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMDXComponents } from '@/components/content/mdx';
import { pageSource } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = pageSource.getPage([params.page]);
  if (!page) notFound();

  return createMetadata({
    title: page.data.title,
    description:
      page.data.description ?? 'The library for building documentation sites',
  });
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;

  const page = pageSource.getPage([params.page]);

  if (!page) notFound();

  const { body: Mdx } = page.data;
  return (
    <section className="mx-auto max-w-2xl space-y-8 px-6 md:space-y-16">
      <article className="mx-auto max-w-6xl flex flex-col px-0 py-8 lg:flex-row lg:px-4">
        <div className="prose min-w-0 flex-1 p-4">
          <Mdx components={getMDXComponents()} />
        </div>
      </article>
    </section>
  );
}
