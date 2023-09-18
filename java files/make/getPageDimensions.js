/***
 * - Helps Puppeteer get the page dimensions
 */

// note: runs from makePdfFromHtml inside puppeteer browser page
export function getPageDimensions(el) {
  let tempDiv = document.createElement('div');
  tempDiv.style.width = '100mm';
  el.append(tempDiv);
  let pxPerMm = getComputedStyle(tempDiv).width.split('px')[0] / 100;
  let section = document.querySelector('section');
  let { width: widthPx, height: heightPx } = getComputedStyle(section);
  widthPx = +widthPx.split('px')[0];
  heightPx = +heightPx.split('px')[0];
  let widthMm = Math.round(widthPx / pxPerMm);
  let heightMm = Math.round(heightPx / pxPerMm);
  widthPx = Math.round(widthPx);
  heightPx = Math.round(heightPx);
  tempDiv.remove();
  return { pxPerMm, widthPx, heightPx, widthMm, heightMm };
}