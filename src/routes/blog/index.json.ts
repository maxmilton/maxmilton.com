// @ts-ignore - no included types
import send from '@polka/send';
import { Req, Res } from '##/types';
import getPosts from './_posts';

const TIME_FIVE_MINUTES = 300000; // 5 * 60 * 1e3;
let json: string;

export async function get(_req: Req, res: Res): Promise<void> {
  if (!json || process.env.NODE_ENV !== 'production') {
    const posts = (await getPosts())
      .filter((post) => !post.metadata.draft)
      .map((post) => ({
        metadata: post.metadata,
        slug: post.slug,
      }));

    json = JSON.stringify(posts);
  }

  send(res, 200, json, {
    'Cache-Control': `max-age=${TIME_FIVE_MINUTES}`,
    'Content-Type': 'application/json',
  });
}
