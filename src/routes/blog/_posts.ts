/* eslint-disable import/no-extraneous-dependencies, id-length */

import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
// @ts-ignore - no included types
import raw from 'rehype-raw';
// @ts-ignore - no included types
import shiki from 'rehype-shiki';
// @ts-ignore - no included types
import stringify from 'rehype-stringify';
// @ts-ignore - no included types
import frontmatter from 'remark-frontmatter';
import parse from 'remark-parse';
// @ts-ignore - no included types
import remark2rehype from 'remark-rehype';
// @ts-ignore - no included types
import vfile from 'to-vfile';
import unified from 'unified';
// @ts-ignore - no included types
import _slug from 'rehype-slug';
import { promisify } from 'util';
import { PostItem } from '##/types';

// eslint-disable-next-line security/detect-non-literal-fs-filename
const readdir = promisify(fs.readdir);

export default async function getPosts(): Promise<PostItem[]> {
  const files = await readdir('content/blog');

  const allPosts = files.map(
    async (file): Promise<PostItem | void> => {
      if (path.extname(file) !== '.md') return;

      const match = /^(\d+-\d+-\d+)-(.+)\.md$/.exec(file);
      if (!match) throw new Error(`Invalid filename '${file}'`);

      const processor = unified()
        .use(parse)
        .use(frontmatter)
        .use(remark2rehype, { allowDangerousHTML: true })
        .use(raw)
        .use(_slug)
        .use(shiki, { theme: 'zeit', useBackground: true })
        .use(stringify, { allowDangerousHTML: true });

      const ast = processor.parse(vfile.readSync(`content/blog/${file}`));
      const metadata =
        ast.children && ast.children[0]?.type === 'yaml'
          ? yaml.safeLoad(ast.children[0].value)
          : {};
      const result = await processor.run(ast);
      const html = processor.stringify(result);

      const [, pubdate, slug] = match;
      const date = new Date(`${pubdate} UTC`);
      metadata.pubdate = pubdate;
      metadata.dateString = date.toLocaleDateString('ja-JP');

      // eslint-disable-next-line consistent-return
      return {
        html,
        metadata,
        slug,
      };
    },
  );

  const sortedPosts = await Promise.all(allPosts);

  // @ts-ignore - FIXME: filter() not modififying type as it passes through
  return (
    sortedPosts
      .filter((x) => !!x)
      // @ts-ignore - FIXME: filter() not modififying type as it passes through
      .sort((a, b) => (a.metadata.pubdate < b.metadata.pubdate ? 1 : -1))
  );
}
