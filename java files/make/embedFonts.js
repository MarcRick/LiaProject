/***
 * - Embeds the fonts in the HTML file
 */

export function embedFonts(html) {
  // replace import from google fonts with locally downloaded fonts
  // (see https://gwfh.mranftl.com/fonts)
  // ...the reason for not using these in theme.css is that they
  // don't work with marp preview in VSC...
  let fonts = '\n' + readFileSync('./fonts.css') + '\n';
  html = html.replace(/\@import url\('https:\/\/fonts.googleapis.com[^\)]*\);/, fonts);
  let fontUrls = JSON.parse(JSON.stringify([...html.matchAll(/url\('\.\.\/fonts\/[^;]*;/g)])).map(x => x[0]);
  let fontPaths = fontUrls.map(x => './fonts/' + x.split('fonts/')[1].split('\') format')[0]);
  let prefix = 'url(data:application/x-font-woff;charset=utf-8;base64,';
  let postfix = ") format('woff');"
  let fontsBin = fontPaths.map(x => prefix + readFileSync(x).toString('base64') + postfix);
  for (let i = 0; i < fontsBin.length; i++) {
    html = html.split(fontUrls[i]).join(fontsBin[i]);
  }
  // make sure we end the style tag and start another onE (important for cleanupHtml)
  html = html.replace(fontsBin.slice(-1)[0], x => x + 'END-OF-FONT-INCLUSION');
  html = html.replace(/END-OF-FONT-INCLUSION[^\}]*\}/, '}\n</style>\n<style>\n');
  return html;
}