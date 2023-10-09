/***
 * - Embeds the images in the HTML file
 */

export async function embedImages(html) {
  html = bgImagesToClasses(html);
  let htmlImages = html.split('img src="').slice(1).map(x => x.split('"')[0]);
  let cssImages = html.split('background-image:url(').slice(1).map(x => removeQuotes(x.split(')')[0]));
  cssImages = cssImages.filter(x => x.indexOf('data') !== 0);
  let imagePaths = [...htmlImages, ...cssImages];
  let images = [];
  for (let path of imagePaths) {
    images.push(`data:image/${path.split('.').slice(-1)};base64,` + (await scaleImage(readFileSync('./' + path))).toString('base64'));
  }
  for (let i = 0; i < images.length; i++) {
    html = html.split(imagePaths[i]).join(images[i]);
  }
  return html;
}