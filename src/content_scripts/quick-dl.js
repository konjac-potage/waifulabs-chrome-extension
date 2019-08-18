/**
 * @file quick download feature
 */

import App from './modules/app';
import { downloadWaifu } from './modules/utils';
import { generate_big } from './modules/api';

/**
 * @param {HTMLElement} element
 */
function registerOnClick(element) {
  if (!element['_register_quick_dl']) {
    element['_register_quick_dl'] = true;
    element.addEventListener('contextmenu', (e) => e.preventDefault());
    element.addEventListener('mousedown', async (e) => {
      // right click = download
      if (e.button === 2) {
        const app = new App();
        if (element.className === 'my-girl') {
          // download current waifu
          const waifu = app.getState().girl;
          downloadWaifu(waifu.seeds, waifu.image);
        } else {
          // download waifu on grid
          const index = [...element.parentNode.children].indexOf(element);
          const waifu = app.getState().girls[index];
          downloadWaifu(waifu.seeds, await generate_big(waifu.seeds));
        }
      }
    });
  }
}

/**
 * @param {App} app
 */
export function applyPatch(app) {
  const step = app.getStep();

  if (0 <= step && step <= 3) {
    document.querySelectorAll('.girl').forEach(registerOnClick);
  }

  if (1 <= step && step <= 4) {
    document.querySelectorAll('.my-girl').forEach(registerOnClick);
  }
}
