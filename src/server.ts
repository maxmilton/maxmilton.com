import './css/main.css'; // Global CSS must come first

import * as sapper from '@sapper/server';
import polka from 'polka';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(sirv('static', { dev }), sapper.middleware())
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
