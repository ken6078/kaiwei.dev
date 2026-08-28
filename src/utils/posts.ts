import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type BlogPost = CollectionEntry<'blog'>;
export type Project = CollectionEntry<'projects'>;

export const entrySlug = (entry: { id: string }) => entry.id.split('/').pop()!;

export async function getPosts(lang: Lang) {
  const posts = await getCollection('blog', ({ data }) =>
    data.lang === lang && (import.meta.env.DEV || !data.draft),
  );
  return posts.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

export async function getProjects(lang: Lang) {
  const projects = await getCollection('projects', ({ data }) => data.lang === lang);
  return projects.sort((a, b) => b.data.order - a.data.order || a.data.name.localeCompare(b.data.name));
}

export function postPath(post: BlogPost) {
  const prefix = post.data.lang === 'zh-TW' ? '/zh-tw' : '';
  return `${prefix}/blog/${entrySlug(post)}/`;
}

export function tagPath(tag: string, lang: Lang) {
  return `${lang === 'zh-TW' ? '/zh-tw' : ''}/tags/${tag}/`;
}
