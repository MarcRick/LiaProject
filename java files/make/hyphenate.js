/***
 * - Hyphenates the text using the hyphen npm module
 */

export async function hyphenate(html) {
  let { language } = settings;
  // get correct hyphenator dependning on language  - fallback to 'en'
  let hyphenator;
  while (!hyphenator) {
    hyphenator = await import('hyphen/' + language + '/index.js')
      .catch(e => { });
    if (!hyphenator && language.includes('-')) {
      language = language.split('-')[0]
    }
    else if (!hyphenator) {
      language = 'en';
    }
  }
  // apply hyphenation
  hyphenator = hyphenator.default.hyphenateHTMLSync;
  html = applyHyphenation(hyphenator, html);
  return { html, language };
}