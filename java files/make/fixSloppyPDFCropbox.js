/***
 * - Crops the PDF very slightly to avoid thin white page borders
 */

export async function fixSloppyPDFCropbox(r) {
  const existingPdfBytes = readFileSync('./dist/index.pdf');
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfMetaData(pdfDoc, r);
  const pages = pdfDoc.getPages();
  let cropPercent = settings.pdfCropPercent;
  for (let page of pages) {
    const { width, height } = page.getCropBox();
    let cropPointsW = width * cropPercent / 100;
    let cropPointsH = height * cropPercent / 100;
    page.setCropBox(cropPointsW, cropPointsH,
      width - cropPointsW * 2, height - cropPointsH * 2);
  }
  const pdfBytes = await pdfDoc.save();
  writeFileSync('./dist/index.pdf', pdfBytes);
}