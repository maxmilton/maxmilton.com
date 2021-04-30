// @ts-expect-error - no included types
import * as sapper from '@sapper/app'; // eslint-disable-line import/no-extraneous-dependencies
import './css/main.css';

sapper.start({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  target: document.getElementById('sapper')!,
});
