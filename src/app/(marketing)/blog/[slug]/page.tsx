import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import path from 'node:path';

import { getMDXComponents } from '@/components/content/mdx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { blogSource } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const locale = await getLocale();
  const page = blogSource.getPage([params.slug], locale);

  if (!page) notFound();

  return createMetadata({
    title: page.data.title,
    description:
      page.data.description ?? 'The library for building documentation sites',
  });
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blogSource.getPage([params.slug]);
  if (!page) notFound();

  const { body: Mdx } = page.data;

  return (
    <section className="mx-auto max-w-2xl px-0 lg:px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{page.data.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-10">
        <h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
        <p className="mb-4 text-md text-gray-600 dark:text-gray-300">
          {page.data.description}
        </p>
        <article className="prose min-w-0 flex-1 mt-8">
          <Mdx components={getMDXComponents()} />
          <div className="flex justify-between">
            <p>
              <span className="text-fd-muted-foreground">Written by</span>{' '}
              <span className="font-medium">{page.data.author}</span>{' '}
            </p>
            <p>
              <span className="text-sm text-fd-muted-foreground">At</span>{' '}
              <span className="font-medium">
                {new Date(
                  page.data.date ??
                    path.basename(page.path, path.extname(page.path))
                ).toDateString()}
              </span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
