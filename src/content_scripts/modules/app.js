/**
 * @file class App
 */

import { getReactInstance } from './utils';

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
}
