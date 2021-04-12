import send from '@polka/send';
import type { Middleware } from 'polka';
import getPosts from '../_posts';

const TIME_FIVE_MINUTES = 300000; // 5 * 60 * 1e3;
let json: string;

export const get: Middleware = async (req, res) => {
  if (!json || process.env.NODE_ENV !== 'production') {
    const posts = (await getPosts())
      .filter((post) => post.metadata.tags?.includes(req.params.slug))
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
};
