/***
 * - Uses Puppeteer to create a PDF and JPG:s
 * - Gathers link position info for PPTX/PowerPoint creation
 */

export async function makePdfFromHtml(r, preWarmedPromise) {
  let { makePDF, makeJPGs, makePPTX: mPPTX, keepJPGs } = settings;
  let { browser, page } = await preWarmedPromise;
  let url = import.meta.url.split('/make/')[0] + '/dist/index.html';
  await page.goto(url);
  let { deviceScaleFactor, jpgScreenshotQuality: quality, pdfCropPercent } = settings;
  // get the dimensions of a section/page in mm
  let { widthPx, heightPx, widthMm, heightMm } =
    await page.$eval('body', getPageDimensions);
  // set view port to page size
  let cropF = (100 - pdfCropPercent * 2) / 100;
  await page.setViewport({
    width: Math.floor(widthPx * cropF),
    height: Math.floor(heightPx * cropF),
    deviceScaleFactor
  });
  // if we don't visit pages with code listings the code listing will
  // not show/print - so visit all pages :) 
  // + take screenshots
  let pages = await page.$eval('body', cleanupAndGetPageLength);
  let pagePaths = [], allLinkPositions = [];
  for (let i = 1; i <= pages; i++) {
    let path = `./dist/jpgs/${(i + '').padStart(5, '0')}.jpg`;
    pagePaths.push(path);
    let linkPositions = await page.$eval('body', getLinkPositions, i, mPPTX);
    allLinkPositions.push(linkPositions.map(x => {
      let b = { ...x };
      b.x = b.x * 100 / widthPx;
      b.y = b.y * 100 / heightPx;
      b.right = b.right * 100 / widthPx;
      b.bottom = b.bottom * 100 / heightPx;
      return b;
    }));
    makeJPGs && await page.screenshot({ path, type: "jpeg", quality });
  }
  makeJPGs && console.log('-'.repeat(58));
  makeJPGs && r('JPGs -> Generated.' + (keepJPGs ? '' : ' (For PPTX, removed later.)'));
  makeJPGs && allLinkPositions.filter(x => x.length).length
    && (console.log('-'.repeat(58)), r('Link -> Links for PPTX extracted.'));
  // now we can print to pdf
  if (makePDF) {
    let pdf = await page.pdf({ width: widthMm + 'mm', height: heightMm + 'mm' });
    writeFileSync('./index.pdf', pdf);
  }
  await browser.close();
  return { widthMm, heightMm, pagePaths, pages, allLinkPositions };
}