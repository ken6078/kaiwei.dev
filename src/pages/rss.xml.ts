import rss from '@astrojs/rss';
import { getPosts, postPath } from '../utils/posts';

export async function GET(context: { site: URL }) {
  const posts = await getPosts('en');
  return rss({
    title: 'Kai-Wei Chou — Blog',
    description: 'Notes on open source, software systems, AI, and lessons learned along the way.',
    site: context.site,
    items: posts.map((post) => ({ title: post.data.title, description: post.data.description, pubDate: post.data.published, link: postPath(post), categories: post.data.tags })),
    customData: '<language>en-US</language>',
  });
}
