import * as sapper from '@sapper/server'; // eslint-disable-line import/no-extraneous-dependencies
// @ts-expect-error - no included types
import polka from 'polka';
import sirv from 'sirv';
import './css/main.css';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(sirv('static', { dev }), sapper.middleware())
  .listen(PORT, (err?: Error) => {
    // eslint-disable-next-line no-console
    if (err) console.error(err);
  });
