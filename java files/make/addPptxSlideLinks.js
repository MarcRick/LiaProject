/***
 * - Adds hyperlinks to PPTX/PowerPoint
 */

export async function addPptxSlideLinks(slide, links) {
  for (let link of links) {
    await slide.addText(' ', {
      hyperlink: link.href[0] !== '#' ?
        { url: link.href } :
        { slide: link.href.slice(1) },
      tooltip: link.href[0] !== '#' ?
        link.href :
        'Slide ' + link.href.slice(1),
      x: link.x + '%',
      y: link.y + '%',
      w: (link.right - link.x) + '%',
      h: (link.bottom - link.y) + '%'
    });
  }
}
