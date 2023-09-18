/***
 * - Global settings affecting conversion, image quality and typography
 */

export const settings = {
  /* which formats to create apart from html (which is always created) */
  makePDF: 1,
  makeJPGs: 0,
  makePPTX: 0,
  /* hyphenation */
  hyphenateTags: ['p', 'li', 'th', 'td'],
  hyphenateMinWordLength: 6,
  hyphenateMinCharsBefore: 3,
  hyphenateMinCharsAfter: 3,
  /* word-spacing / extra width for a space */
  wordSpacingRem: 0.02,
  /* variable letter-spacing (counteracts big spaces on hyphenation) */
  letterSpacingMinRem: -0.02,
  letterSpacingMaxRem: 0.02,
  /* jpg settings compression before embedding in html */
  sharpScaleJpgsTo: 1500,
  sharpJpgQuality: 65,
  /* JPG quality and deviceScaleFactor, jpg screenshots from puppeteer */
  deviceScaleFactor: 2,
  jpgScreenshotQuality: 70,
  /* PDF, image quality, LO to HI: screen, ebook, printer, prepress */
  ghostScriptPdfQuality: 'prepress',
  /* crop PDF file and screenshots from Puppeteer
     slightly to avoid tiny white stripes along sides */
  pdfCropPercent: 0.15
}