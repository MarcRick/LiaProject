/***
 * - Adjust the letter-spacing for justified text to minimize gaps
 */

export async function adjustLetterSpacing(page = 1, loadPage) {
  loadPage = loadPage || +location.hash.slice(1);
  (!loadPage || isNaN(loadPage)) && (loadPage = 1);
  let {
    letterSpacingMinRem: minSpace,
    letterSpacingMaxRem: maxSpace
  } = settings;
  document.body.style.opacity = 0; // temp hide content
  await document.fonts.ready;
  let section = [...document.querySelectorAll('section')]
    .find(x => x.id.replace(/\D/g, '') === page + '');
  if (!section) {
    location.hash = '#' + loadPage;
    document.body.style.opacity = 1; // show content
    return;
  }
  location.hash = '#' + page;
  wrapWords(section);
  let spaces = getSpaceWidths();
  let step = (maxSpace - minSpace) / 50;
  for (let { el, baseW, words } of spaces) {
    let candidates = [];
    for (let i = minSpace; i <= maxSpace; i += step) {
      words.forEach(w => w.style.letterSpacing = i + 'rem');
      candidates.push({ space: i, val: el.offsetWidth / baseW });
    }
    let best = findBestLetterSpacing(candidates);
    words.forEach(w => w.style.letterSpacing = best.space + 'rem');
  }
  adjustLetterSpacing(page + 1, loadPage);
}