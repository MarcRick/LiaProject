/***
 * - Includes client side code for opening external links in new tabs
 */

export function makeLinkTargetsBlankAdd(html) {
  html = html.split('</body>').join('<script>' + makeLinkTargetsBlank + ';makeLinkTargetsBlank();</script></body>');
  return html;
}

