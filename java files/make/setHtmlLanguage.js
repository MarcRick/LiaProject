/***
 * - Sets the html lang attribute according to settings
 */

export function setHTMLLanguage(html) {
  let { language } = settings;
  html = html.replace(/<html[^>]*>/g, `<html lang="${language}">`);
  return html;
}