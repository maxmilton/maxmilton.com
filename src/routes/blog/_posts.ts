/* eslint-disable import/no-extraneous-dependencies */

import { promises as fs } from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import raw from 'rehype-raw';
// @ts-expect-error - no included types
import shiki from 'rehype-shiki';
import _slug from 'rehype-slug';
import stringify from 'rehype-stringify';
import frontmatter from 'remark-frontmatter';
import parse from 'remark-parse';
import remark2rehype from 'remark-rehype';
// @ts-expect-error - no included types
import vfile from 'to-vfile';
import unified from 'unified';
import type { Parent } from 'unist'; // eslint-disable-line import/no-unresolved
import type { MetaData, PostItem } from '##/types';

const CONTENT_DIRS = ['content/blog'];

if (process.env.NODE_ENV !== 'production') {
  CONTENT_DIRS.push('content/wip');
}

let postItems: PostItem[];

const processor = unified()
  .use(parse)
  .use(frontmatter)
  .use(remark2rehype, { allowDangerousHtml: true })
  .use(raw)
  .use(_slug)
  .use(shiki, {
    theme: 'zeit',
    useBackground: true,
  })
  .use(stringify, {
    allowDangerousCharacters: true,
    allowDangerousHtml: true,
  });

export default async function getPosts(): Promise<PostItem[]> {
  if (!postItems) {
    const posts = CONTENT_DIRS.map(async (dir) => {
      try {
        await fs.access(dir);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`Invalid directory '${dir}'`);
        return;
      }

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const files = await fs.readdir(dir);

      // eslint-disable-next-line consistent-return
      return files.map(async (file) => {
        if (path.extname(file) !== '.md') return;

        const match = /^(\d+-\d+-\d+)-(.+)\.md$/.exec(file);
        if (!match) throw new Error(`Invalid filename '${file}'`);

        const filePath = `${dir}/${file}`;
        const ast = processor.parse(vfile.readSync(filePath)) as Parent;
        const metadata =
          ast.children[0].type === 'yaml'
            ? (yaml.load(ast.children[0].value as string) as MetaData)
            : ({} as MetaData);
        const result = await processor.run(ast);
        const html = processor.stringify(result);
        // FIXME: Move this into a rehype plugin so it's code/pre aware
        // // reduce multiple whitespace down to a single space
        // .replace(/\s{2,}/gm, ' ')
        // // convert remaining whitespace characters into a space
        // .replace(/\s/gm, ' ')
        // // remove whitespace between the most common safe tag combinations
        // .replace(/<\/p> <p/gm, '</p><p')
        // .replace(/<ul> <li>/gm, '<ul><li>')
        // .replace(/<\/li> <\/ul>/gm, '</li></ul>')
        // .replace(/<\/ul> <p/gm, '</ul><p')
        // .replace(/<\/p> <ul/gm, '</p><ul')
        // .replace(/<\/li> <li/gm, '</li><li')
        // .replace(/<\/h([1-6])> <p/gm, '</h$1><p')
        // .replace(/<\/p> <h([1-6])/gm, '</p><h$1');

        const [, pubdate, slug] = match;
        const dateFormat = new Intl.DateTimeFormat('en-AU', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        const date = new Date(`${pubdate} UTC`);
        metadata.pubdate = pubdate;
        metadata.date = dateFormat.format(date);

        // eslint-disable-next-line consistent-return
        return {
          html,
          metadata,
          slug,
        };
      });
    });

    const unsortedPosts = await Promise.all((await Promise.all(posts)).flat());

    postItems = unsortedPosts
      .filter((post): post is PostItem => !!post && !post.metadata.draft)
      .sort((aa, bb) => (aa.metadata.pubdate < bb.metadata.pubdate ? 1 : -1));
  }

  return postItems;
}
