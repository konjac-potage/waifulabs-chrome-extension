/**
 * @file content script entry point
 */

import App from './modules/app';
import * as seek_step from './seek-step';
import * as quick_dl from './quick-dl';
import * as swap_girl from './swap-girl';
import * as prevent_murder from './prevent-murder';
import * as load_on_drop from './load-on-drop';

import './fix-ui.scss';

/* Apply patches when DOM subtree is modified */
const observer = new MutationObserver(() => {
  const app = new App();

  seek_step.applyPatch(app);
  quick_dl.applyPatch(app);
  swap_girl.applyPatch(app);
  prevent_murder.applyPatch(app);
});

observer.observe(document.getElementById('root'), {
  attributes: false,
  childList: true,
  subtree: true,
});

/* Apply patches immediately */
load_on_drop.applyPatch();
