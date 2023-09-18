/***
 * - Scales imags using the npm module sharp
 */

export async function scaleImage(buffer) {
  let { resizeSettings, jpegSettings } = settings;
  return sharp(buffer)
    .resize(...resizeSettings)
    .jpeg(...jpegSettings)
    .toBuffer();
};