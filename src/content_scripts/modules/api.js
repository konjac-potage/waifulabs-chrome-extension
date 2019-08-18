/**
 * @file waifulabs.com API wrappers
 */

/**
 * fetch big image
 * @param {(number|number[])[]} seeds
 * @return {Promise<string>} base64-encoded string content of image/png
 */
export async function generate_big(seeds) {
  const res = await fetch('https://api.waifulabs.com/generate_big', {
    body: JSON.stringify({
      currentGirl: seeds,
      size: 512,
      step: 4,
    }),
    method: 'POST',
  });

  return (await res.json()).girl;
}

/**
 * fetch next girls
 * @param {(number|number[])[]} seeds
 * @param {number} step
 * @return {Promise<string>} base64-encoded string content of image/png
 */
export async function generate(seeds, step) {
  const res = await fetch('https://api.waifulabs.com/generate', {
    body: JSON.stringify({
      currentGirl: seeds,
      step,
    }),
    method: 'POST',
  });

  return (await res.json()).newGirls;
}
