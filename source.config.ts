import { defineCollections, frontmatterSchema } from 'fumadocs-mdx/config';
import z from 'zod';

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    date: z.string(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional().default(false),
    readTime: z.string().optional(),
    author: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const page = defineCollections({
  type: 'doc',
  dir: 'content/page',
  schema: frontmatterSchema.extend({}),
});
