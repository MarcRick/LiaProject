/***
 * - Get widhts of spaces needed fo letter-spacing adjustments
 */

export function getSpaceWidths() {
  let { hyphenateTags: parentSel } = settings;
  parentSel = parentSel.join(', ');
  let words = [...document.querySelectorAll('a-word')];
  let spaces = [...document.querySelectorAll('a-space')];
  // only keep one space per common parentNode and line
  let parentNodeMem = [];
  spaces = spaces.filter(el => {
    let pNode = el.closest(parentSel);
    let y = el.getBoundingClientRect().y;
    let keep = !parentNodeMem.find(([a, b]) => a === pNode && b === y);
    parentNodeMem.push([pNode, y]);
    return keep;
  });
  // check how stretched the spaces are
  nonJustify();
  spaces = spaces
    .map(el => ({ el, w: el.offsetWidth }))
    .filter(({ w }) => w);
  reJustify();
  spaces.forEach(x => x.w2 = x.el.offsetWidth);
  spaces = spaces
    .filter(({ w, w2 }) => w !== w2)
    .map(({ el, w, w2 }) => ({
      el,
      stretch: w2 / w,
      baseW: w,
      words: words.filter(x =>
        x.closest(parentSel) === el.closest(parentSel)
        && x.getBoundingClientRect().y === el.getBoundingClientRect().y
      )
    }));
  spaces.forEach(x => x.phrase = x.words.map(x => x.innerText).join(' '));
  return spaces;
}