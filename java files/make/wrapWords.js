/***
 * - Wraps words inside a-word tags
 * - Wraps spaces inside a-space tags
 * - Used for letter spacing
 */

export function wrapWords(insideEl) {
  let nodes = textNodesUnder(insideEl)
    .filter(x => x.textContent.replace(/\n/g, '').length > 1);
  nodes.forEach(node => {
    let text = node.textContent, currentNode;
    for (let word of text.split(' ')) {
      if (currentNode) {
        let aSpace = document.createElement('a-space');
        aSpace.innerText = ' ';
        currentNode.after(aSpace);
        currentNode = aSpace;
      }
      let aWord = document.createElement('a-word');
      aWord.innerText = word;
      !currentNode ? node.replaceWith(aWord) : currentNode.after(aWord);
      currentNode = aWord;
    }
  });
}