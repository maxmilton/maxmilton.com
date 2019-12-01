import './css/main.css'; // Global CSS must come first

import * as sapper from '@sapper/app'; // eslint-disable-line import/no-extraneous-dependencies

// eslint-disable-next-line @typescript-eslint/no-floating-promises
sapper.start({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  target: document.getElementById('sapper')!,
});
