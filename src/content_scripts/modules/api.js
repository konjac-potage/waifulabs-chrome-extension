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
