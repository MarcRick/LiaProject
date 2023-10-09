/***
 * - Get link positiions so they can be included in the PPTX/PowerPint
 */

// note: runs from makePdfFromHtml inside puppeteer browser page
export function getLinkPositions(el, i, mPPTX) {
  location.hash = '#' + i;
  if (!mPPTX) { return []; }
  return [...document.querySelectorAll(`#x${i} a[href]`)]
    .map(x => {
      let bRect = x.getBoundingClientRect();
      return {
        href: x.getAttribute('href'),
        x: bRect.x, y: bRect.y, right: bRect.right, bottom: bRect.bottom
      };
    })
    .filter(x => x.bottom !== 0);
}