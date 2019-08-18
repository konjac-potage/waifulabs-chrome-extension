/**
 * @file show message before leaving page
 */

import App from './modules/app';

/**
 * @param {App} app
 */
export function applyPatch(app) {
  const step = app.getStep();

  if (0 <= step && step <= 4) {
    window.onbeforeunload = () => {
      const state = new App().getState();
      if (state && state.girl) localStorage.waifu = JSON.stringify(state.girl);
      return 'Are you sure you want to leave?';
    };
  } else {
    window.onbeforeunload = null;
  }

  const button = document.querySelector('.go-back-button');
  if (button && !button['_register_prevent_murder']) {
    button['_register_prevent_murder'] = true;
    button.addEventListener(
      'click',
      (e) => {
        if (
          !window.confirm('Are you shure? These girls are going to be lost!')
        ) {
          e.stopImmediatePropagation();
        }
      },
      true,
    );
  }
}
