// @ts-expect-error - no included types
import send from '@polka/send';
import { PostItem, Req, Res } from '##/types';
import getPosts from './_posts';

const TIME_THIRTY_MINUTES = 1800000; // 30 * 60 * 1e3;
const months = ',Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');

function formatPubdate(str: string): string {
  const [year, month, day] = str.split('-');
  return `${day} ${months[+month]} ${year} 12:00 +0000`;
}

const rss = (posts: PostItem[]): string =>
  `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Svelte blog</title>
  <link>https://svelte.dev/blog</link>
  <description>News and information about the magical disappearing UI framework</description>
  <image>
    <url>https://svelte.dev/favicon.png</url>
    <title>Svelte</title>
    <link>https://svelte.dev/blog</link>
  </image>
  ${posts
    .filter((post) => !post.metadata.draft)
    .map(
      (post) => `
    <item>
      <title>${post.metadata.title}</title>
      <link>https://svelte.dev/blog/${post.slug}</link>
      <description>${post.metadata.description}</description>
      <pubDate>${formatPubdate(post.metadata.pubdate)}</pubDate>
    </item>
  `,
    )
    .join('')}
</channel>
</rss>
`
    .replace(/>[^\S]+/gm, '>')
    .replace(/[^\S]+</gm, '<')
    .trim();

export async function get(_req: Req, res: Res): Promise<void> {
  const posts = await getPosts();

  send(res, 200, rss(posts), {
    'Cache-Control': `max-age=${TIME_THIRTY_MINUTES}`,
    'Content-Type': 'application/rss+xml',
  });
}
