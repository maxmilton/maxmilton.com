import './css/main.css'; // Global CSS must come first

import * as sapper from '@sapper/app';

sapper.start({
  target: document.getElementById('sapper'),
});
