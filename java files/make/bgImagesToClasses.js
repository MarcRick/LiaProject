/***
 * - Converts bg images to classes (avoids double embedding)
 */

export function bgImagesToClasses(html) {
  let i = 0;
  let hash = {};
  html = html.replace(/<figure style="background-image[^>]*>/g, (x => {
    i++;
    hash[x] = hash[x] || [];
    hash[x].push(i);
    return `<figure class="bg-image-${i}">`;
  }));
  let style = "\n";
  for (let [key, val] of Object.entries(hash)) {
    let selector = val.map(x => 'figure.bg-image-' + x).join(', ');
    style += selector + ' {\n  ' + key.split('"')[1].split('&quot;').join("'").slice(0, -1) + '!important;\n}\n';
  }
  style += '\n';
  html = html.replace(/<\/style>/, style + '</style>');
  return html;
}