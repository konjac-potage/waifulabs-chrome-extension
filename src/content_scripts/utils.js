/**
 * @file utility module
 */

/**
 * get react internal instance object from dom
 * @param {Element} dom
 * @return {any|undefined} return undefined if __reactInternalInstance is not found
 */
export function getReactInstance(dom) {
  if (!dom) return undefined;

  const propName = Object.keys(dom).find((key) =>
    key.startsWith('__reactInternalInstance$'),
  );

  if (!propName) {
    return undefined;
  } else {
    return dom[propName];
  }
}

/**
 * @param {string} fileName
 * @param {string} href
 */
export function downloadToFile(fileName, href) {
  const a = document.createElement('a');
  a.download = fileName;
  a.href = href;
  a.click();
}
