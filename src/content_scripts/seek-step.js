/**
 * @file step seeking feature
 */

import App from './app';

/**
 * @param {App} app
 */
export function applyPatch(app) {
  const step = app.getStep();
  if (0 <= step && step <= 3) {
    const targets = [
      ...document.querySelectorAll('.ant-steps-item-content'),
    ].slice(1, 4);
    targets.forEach((dom, index) => {
      if (step !== 0) {
        dom.onclick = () => {
          new App().seekStep(index + 1);
        };
        dom.style.cursor = 'pointer';
      } else {
        dom.onclick = null;
        dom.style.cursor = null;
      }
    });
  }
}
