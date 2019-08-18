/**
 * @file set a girl on the grid as current girl
 */

import App from './modules/app';

/**
 * @param {HTMLElement} element
 */
function registerOnClick(element) {
  if (!element['_register_swap_girl']) {
    element['_register_swap_girl'] = true;
    element.addEventListener('mousedown', (e) => {
      // middle click = set as current girl
      if (e.button === 1) {
        const app = new App();
        app.getState().step--;
        element.click();
        e.preventDefault();
      }
    });
  }
}

/**
 * @param {App} app
 */
export function applyPatch(app) {
  const step = app.getStep();

  if (1 <= step && step <= 3) {
    document.querySelectorAll('.girl').forEach(registerOnClick);
  }
}
