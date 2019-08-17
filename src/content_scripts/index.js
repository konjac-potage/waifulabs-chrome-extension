/**
 * @file content script entry point
 */

import App from './app';
import * as seek_step from './seek-step';

/* Apply patches when DOM subtree is modified */
const observer = new MutationObserver(() => {
  const app = new App();

  seek_step.applyPatch(app);
});

observer.observe(document.getElementById('root'), {
  attributes: false,
  childList: true,
  subtree: true,
});
