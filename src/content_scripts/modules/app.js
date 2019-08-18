/**
 * @file class App
 */

import { getReactInstance } from './utils';
import { generate_big } from './api';

/**
 * Provide method to access original application
 */
export default class App {
  constructor() {
    const $App = document.querySelector('.App');
    this.instance = getReactInstance($App);
  }

  getState() {
    if (
      this.instance &&
      this.instance.return &&
      this.instance.return.memoizedState
    ) {
      return this.instance.return.memoizedState;
    } else {
      return undefined;
    }
  }

  getStep() {
    const state = this.getState();
    return state ? state.step : -1;
  }

  seekStep(step) {
    const state = this.getState();
    const button = document.querySelector('.keep-button>button');
    if (state && button) {
      state.step = step - 1;
      button.click();
    }
  }

  async loadWaifu(seeds) {
    const step = this.getStep();
    const waifu = {
      image: await generate_big(seeds),
      seeds,
    };
    if (1 <= step && step <= 4) {
      this.getState().girl = waifu;
      document.querySelector(
        '.my-girl-image',
      ).src = `data:image/png;charset=utf-8;base64,${waifu.image}`;
    } else {
      localStorage.waifu = JSON.stringify(waifu);
      window.location = location;
    }
  }
}
