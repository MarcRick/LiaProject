/***
 * - Creates a PPTX/PowerPoint using the npm module pptxgenjs
 */

export async function makePptx(widthMm, heightMm, pagePaths, allLinkPositions) {
  let { author, title, description } = settings;
  let cFactorInches = 0.0393700787;
  let width = widthMm * cFactorInches, height = heightMm * cFactorInches;
  let pptx = new pptxgen();
  pptx.author = author;
  pptx.company = author;
  pptx.subject = description;
  pptx.title = title;
  await pptx.defineLayout({ name: 'cSize', width, height });
  for (let path of pagePaths) {
    let slide = await pptx.addSlide();
    await slide.addImage({ path, x: 0, y: 0, w: '100%', h: '100%' });
    // add links (previously extracted in makePDFFromHtml)
    await addPptxSlideLinks(slide, allLinkPositions.shift());
  }
  await pptx.writeFile({ fileName: './dist/index.pptx', compression: true });
}