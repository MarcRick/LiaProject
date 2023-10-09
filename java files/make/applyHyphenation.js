/***
 * - Apply hyphenation according to settings
 */

export function applyHyphenation(hyphenator, html) {
  let {
    hyphenateTags: els,
    hyphenateMinWordLength: minWordLength,
    hyphenateMinCharsBefore: minCharsBefore,
    hyphenateMinCharsAfter: minCharsAfter,
  } = settings;
  // hyphenate
  for (let el of els) {
    let reg = new RegExp(`<${el}[^>]*>.*?<\\/${el}>`, 'g');
    html = html.replace(reg, x => {
      let a = hyphenator(x, { minWordLength });
      // adhere to minCharsBefore and minCharsAfter
      let b = a.split('\u00AD');
      let c = '';
      for (let i = 0; i < b.length - 1; i++) {
        let keep = !(b[i].slice(-minCharsBefore).replace(/[\p{L}-]/ug, ''))
          && !(b[i + 1].slice(0, minCharsAfter).replace(/[\p{L}-]/ug, ''));
        c += b[i] + (keep ? '\u00AD' : '');
      }
      c += b.slice(-1);
      return c;
    });
  }
  return html;
}