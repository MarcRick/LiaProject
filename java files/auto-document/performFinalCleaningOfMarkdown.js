export function performFinalCleaningOfMarkdown(md, allContent, readFileSync, pathJoin, __dirname) {
  md = md.join('\n\n');
  md = md.split('\n').map(x => x.trim()).join('\n');
  let code = allContent.map(x => x.code);
  md = md.replace(/\[theCodeHere\]/g, x => code.shift());
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.split('* - ').join('- ');
  md = md.split('** from **_index.js**').join('**index.js**');
  md = md.split('### ').join('#### ');
  md = md.split('\n## ').join('\n---\n## ');
  md = md.split('letter*spacing').join('letter-spacing')
  md = readFileSync(pathJoin(__dirname, 'base.md'), 'utf-8') + md;
  return md;
}