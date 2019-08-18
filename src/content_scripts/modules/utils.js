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
    `${Gene.fromSeeds(seeds).toString()}.png`,
    `data:image/png;charset=utf-8;base64,${image}`,
  );
}

export class Gene {
  /**
   * @param {number|undefined} color
   * @param {number|undefined} details
   * @param {number|undefined} pose
   */
  constructor(color, details, pose) {
    if (color >= 0) this.color = color;
    if (details >= 0) this.details = details;
    if (pose >= 0) this.pose = pose;
  }

  static fromObject(gene) {
    const { color, details, pose } = gene;
    return new Gene(color, details, pose);
  }

  static fromSeeds(seeds) {
    return new Gene(seeds[12], seeds[4], seeds[0]);
  }

  static fromString(str) {
    const color = str.match(/c(\d+)/);
    const details = str.match(/d(\d+)/);
    const pose = str.match(/p(\d+)/);

    const gene = {};
    if (color) gene.color = +color[1];
    if (details) gene.details = +details[1];
    if (pose) gene.pose = +pose[1];

    return this.fromObject(gene);
  }

  toSeeds(s16 = 0, s17 = [0, 0, 0]) {
    const { color, details, pose } = this;
    return [
      ...Array(4).fill(pose || 0),
      ...Array(8).fill(details || 0),
      ...Array(4).fill(color || 0),
      s16,
      s17,
    ];
  }

  toString() {
    const { color, details, pose } = this;
    return [
      color ? `c${color}` : '',
      details ? `d${details}` : '',
      pose ? `p${pose}` : '',
    ].join('-');
  }
}
