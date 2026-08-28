import type { BlogPost } from './posts';
import { postPath } from './posts';
import type { Lang } from '../i18n';

export function findTranslation(post: BlogPost, posts: BlogPost[]) {
  return posts.find((candidate) =>
    candidate.data.translationKey === post.data.translationKey && candidate.data.lang !== post.data.lang,
  );
}

export function counterpartPath(pathname: string, lang: Lang) {
  if (lang === 'en') return `/zh-tw${pathname === '/' ? '/' : pathname}`;
  const withoutLocale = pathname.replace(/^\/zh-tw(?=\/|$)/, '');
  return withoutLocale || '/';
}

export function alternateForPost(post: BlogPost, allPosts: BlogPost[]) {
  const translation = findTranslation(post, allPosts);
  return translation ? postPath(translation) : null;
}
