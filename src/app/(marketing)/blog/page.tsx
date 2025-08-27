import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { BlogCard } from '@/components/content/blog-card';
import { TagFilter } from '@/components/content/tag-filter';
import { blogSource } from '@/lib/content';
import { formatDate } from '@/lib/utils';

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const locale = await getLocale();
  const resolvedSearchParams = await searchParams;
  const allPages = blogSource.getPages(locale);
  const sortedBlogs = allPages
    .sort((a, b) => {
      const dateA = new Date(a.data.date).getTime();
      const dateB = new Date(b.data.date).getTime();
      return dateB - dateA;
    })
    .filter((post) => post.locale === locale);

  const allTags = [
    'All',
    ...Array.from(
      new Set(sortedBlogs.flatMap((blog) => blog.data.tags || []))
    ).sort(),
  ];

  const selectedTag = resolvedSearchParams.tag || 'All';
  const filteredBlogs =
    selectedTag === 'All'
      ? sortedBlogs
      : sortedBlogs.filter((blog) => blog.data.tags?.includes(selectedTag));

  const tagCounts = allTags.reduce(
    (acc, tag) => {
      if (tag === 'All') {
        acc[tag] = sortedBlogs.length;
      } else {
        acc[tag] = sortedBlogs.filter((blog) =>
          blog.data.tags?.includes(tag)
        ).length;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 bg-background relative mt-4">
      <div className="border-b border-border flex flex-col gap-6 min-h-[250px] items-center relative z-10">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Blog
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
            Latest news and updates from Magic UI.
          </p>
        </div>
        {allTags.length > 0 && (
          <TagFilter
            tags={allTags}
            selectedTag={selectedTag}
            tagCounts={tagCounts}
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        <Suspense fallback={<div>Loading articles...</div>}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
              filteredBlogs.length < 4 ? 'border-b' : 'border-b-0'
            }`}
          >
            {filteredBlogs.map((blog) => {
              const date = new Date(blog.data.date);
              const formattedDate = formatDate(date);

              return (
                <BlogCard
                  key={blog.url}
                  url={blog.url}
                  title={blog.data.title}
                  description={blog.data.description}
                  date={formattedDate}
                  thumbnail={blog.data.thumbnail}
                  showRightBorder={filteredBlogs.length < 3}
                />
              );
            })}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
