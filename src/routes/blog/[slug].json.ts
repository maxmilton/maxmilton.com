import send from '@polka/send';
import { PostItem, Req, Res } from '##/types';
import getPosts from './_posts';

const TIME_FIVE_MINUTES = 5 * 60 * 1e3;
let lookup: Map<string, PostItem>;

export async function get(req: Req, res: Res): Promise<void> {
  if (!lookup || process.env.NODE_ENV !== 'production') {
    lookup = new Map();
    const posts = await getPosts();
    posts.forEach((post) => {
      lookup.set(post.slug, post);
    });
  }

  const post = lookup.get(req.params.slug);

  if (post) {
    res.setHeader('Cache-Control', `max-age=${TIME_FIVE_MINUTES}`);
    send(res, 200, post);
  } else {
    send(res, 404, { message: 'not found' });
  }
}
