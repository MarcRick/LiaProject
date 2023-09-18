/***
 * - Cleanup of HTML (mostly included style attributes)
 * - Makes the HTML valid in linters such as VSC:s built in linter
 */

export function cleanupHtmlForLinters(html) {
  // no empty style attribute
  html = html.replace(/style=""/g, '');
  html = html.split(' style="');
  let cleaned = [];
  // no escaped &lt; or &gt in style attributes
  // replace with < and >
  for (let part of html) {
    let [style, ...rest] = part.split('"');
    style = style
      .replace(/\&lt\;/g, '<')
      .replace(/\&gt\;/g, '>')
    cleaned.push([style, ...rest].join('"'));
  }
  html = cleaned.join(' style="');
  // enumerate style tags
  let i = 1;
  html = html.replace(/<style>/g, x => `<style class="style-${i++}">`);
  // replace style tag 3 with link tag and base 64 encoded css since linters
  // (the one in VSC for example) otherwise complains about non-standard rules
  let sContent = html.match(/<style class="style-3">.*?<\/style>/s) + '';
  let sContentInner = sContent.slice(
    sContent.indexOf('>') + 1, sContent.lastIndexOf('<')
  );
  let base64Inner = 'data:text/css;base64,'
    + Buffer.from(sContentInner, "utf-8").toString('base64');
  html = html.split(sContent)
    .join(`<link rel="stylesheet" href="${base64Inner}">`);
  return html;
}