/**
 * @file content script entry point
 */

import App from './modules/app';
import * as seek_step from './seek-step';
import * as quick_dl from './quick-dl';
import * as swap_girl from './swap-girl';

/* Apply patches when DOM subtree is modified */
const observer = new MutationObserver(() => {
  const app = new App();

  seek_step.applyPatch(app);
  quick_dl.applyPatch(app);
  swap_girl.applyPatch(app);
});

observer.observe(document.getElementById('root'), {
  attributes: false,
  childList: true,
  subtree: true,
});
