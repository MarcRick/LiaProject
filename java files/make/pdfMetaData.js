/***
 * - Sets PDF meta data
 */

export function pdfMetaData(pdfDoc, r) {
  let { author, language, title, description } = settings;
  pdfDoc.setTitle(title);
  pdfDoc.setSubject(description);
  pdfDoc.setAuthor(author);
  pdfDoc.setLanguage(language);
  pdfDoc.setProducer(author + '\'s toolbox');
  pdfDoc.setCreator(author);
  r('PDF  -> Modified meta data.');
}