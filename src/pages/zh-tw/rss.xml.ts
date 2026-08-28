import rss from '@astrojs/rss';
import { getPosts, postPath } from '../../utils/posts';

export async function GET(context: { site: URL }) {
  const posts = await getPosts('zh-TW');
  return rss({
    title: '周楷崴的文章',
    description: '分享開源、軟體系統、AI 與實作過程中的經驗。',
    site: context.site,
    items: posts.map((post) => ({ title: post.data.title, description: post.data.description, pubDate: post.data.published, link: postPath(post), categories: post.data.tags })),
    customData: '<language>zh-TW</language>',
  });
}
