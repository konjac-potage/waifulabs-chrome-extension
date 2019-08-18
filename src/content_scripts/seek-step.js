/**
 * @file step seeking feature
 */

import App from './modules/app';
import * as API from './modules/api';
import { getReactInstance } from './modules/utils';

/**
 * @param {App} app
 */
export function applyPatch(app) {
  const step = app.getStep();

  // page with step bar
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

  // final step page
  else if (step == 4) {
    const parent = document.querySelector('.my-girl-container');
    if (parent && !parent['_register_seek_step']) {
      parent['_register_seek_step'] = true; // apply patch only once

      ['Color', 'Details', 'Pose'].forEach((name, index) => {
        // create button to seek step
        const button = parent
          .appendChild(document.createElement('div'))
          .appendChild(document.createElement('button'));

        button.className = 'bp3-button bp3-fill bp3-minimal';
        button.textContent = `Change ${name}`;
        button.onclick = async () => {
          // do seek by executing undo()
          const app = new App();
          const state = app.getState();

          state.lastStep = index + 1;
          state.lastGirl = state.girl;
          state.lastGirls = await API.generate(state.girl.seeds, index + 1);
          state.loading = false;

          getReactInstance(parent).return.memoizedProps.undo();
        };
      });
    }
  }
}
