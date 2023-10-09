/***
 * - Part 2 of main/start function
 * - Makes HTML, PDF, JPG and PPTX files from index.md
 */

export async function _makePart2(preWarmedPromise, startTime, r, r2) {
  let { makePDF, makePPTX: mPPTX, keepJPGs } = settings;
  let { widthMm, heightMm, pagePaths, pages, allLinkPositions }
    = await makePdfFromHtml(r, preWarmedPromise);
  console.log('-'.repeat(58));
  if (makePDF) {
    r('PDF  -> Created index.pdf.');
    compressPDF();
    r('PDF  -> Compressed PDF.');
    rmSync('./index.pdf');
    await fixSloppyPDFCropbox(r);
    r('PDF  -> Fixed crop box.');
    r2('-'.repeat(58));
  }
  if (mPPTX) {
    await makePptx(widthMm, heightMm, pagePaths, allLinkPositions);
    r('PPTX -> Generated.');
    r2('-'.repeat(58));
  }
  r2('All done!');
  r2('-'.repeat(58));
  r2('Number of pages:', pages);
  r2('Total time taken:',
    ((Date.now() - startTime) / 1000).toFixed(2) + ' sec');
  !keepJPGs && rmSync('./dist/jpgs', { recursive: true, force: true });
  let s = x => (x / 1024 / 1024).toFixed(2) + '  MB';
  r2('MB/page in HTML:', s(statSync('./dist/index.html').size / pages))
  r2('HTML file size:', s(statSync('./dist/index.html').size));
  r2('PDF  file size:', s(statSync('./dist/index.pdf').size));
  let jpgSize = keepJPGs && pagePaths.map(x => statSync(x).size).reduce((a, c) => a + c);
  keepJPGs && r2('JPGs file size:', s(jpgSize));
  mPPTX && r2('PPTX file size:', s(statSync('./dist/index.pptx').size));
  r2('-'.repeat(58));
}