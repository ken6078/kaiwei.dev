import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const locale = z.enum(['en', 'zh-TW']);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    lang: locale,
    translationKey: z.string().min(1),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    lang: locale,
    translationKey: z.string().min(1),
    status: z.enum(['active', 'maintained', 'completed', 'archived']),
    featured: z.boolean().default(false),
    github: z.url().optional(),
    url: z.url().optional(),
    blog: z.string().startsWith('/').optional(),
    technologies: z.array(z.string()).default([]),
    order: z.number().int().default(0),
  }),
});

export const collections = { blog, projects };
