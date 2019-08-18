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
 * @param {string} url
 */
export function downloadFile(fileName, url) {
  const a = document.createElement('a');
  a.download = fileName;
  a.href = url;
  a.click();
}

export function downloadWaifu(seeds, image) {
  downloadFile(
    `c${seeds[12]}-d${seeds[4]}-p${seeds[0]}.png`,
    `data:image/png;charset=utf-8;base64,${image}`,
  );
}
