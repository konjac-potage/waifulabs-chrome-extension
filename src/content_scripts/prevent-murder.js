/**
 * @file show message before leaving page
 */

export function applyPatch() {
  window.onbeforeunload = () => 'Are you sure you want to leave?';
}
