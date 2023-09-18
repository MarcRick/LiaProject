/***
 * - Extract text nodes in a DOM element 
 * - Used for letter spacing
 */

export function textNodesUnder(el) {
  var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while (n = walk.nextNode()) a.push(n);
  return a;
}