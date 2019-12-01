import './css/main.css'; // Global CSS must come first

import * as sapper from '@sapper/server'; // eslint-disable-line import/no-extraneous-dependencies
// @ts-ignore - FIXME: Add types
import polka from 'polka';
// @ts-ignore - FIXME: Add types
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(sirv('static', { dev }), sapper.middleware())
  .listen(PORT, (err?: Error) => {
    // eslint-disable-next-line no-console
    if (err) console.error(err);
  });
