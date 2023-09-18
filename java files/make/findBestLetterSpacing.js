/***
 * - Find the base candidate among different letter spacings
 * - Closest to normal spacing
 * - If several options give the same spacing -> tigher kerning
 */

export function findBestLetterSpacing(candidates) {
  return candidates.sort((a, b) => {
    if (a.val === b.val) {
      return Math.abs(a.space) < Math.abs(b.space) ? -1 : 1;
    }
    return a.val < b.val ? -1 : 1;
  })[0];
}