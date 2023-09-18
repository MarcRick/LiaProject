export function parseAndextractInfo(allContent) {
  for (let part of allContent) {
    part.description = part.content.split('/***')[1].split('*/')[0];
    part.code = part.content.split('/***' + part.description + '*/').join('').trim();
    part.description = part.description.trim();
    delete part.content;
  }
  for (let part of allContent) {
    part.uses = allContent.filter(x =>
      x !== part && x.exports.some(
        x => ('\n' + part.code)
          .replace(/\n\s*\/\/[^\n]*/g, '')
          .match(new RegExp(x + '\\W'))));
    part.file === '__settings.js' && (part.uses.length = 0);
    part.uses.forEach(x => x.usedBy.push(part));
    part.uses = part.uses.filter(x => x.file !== '_loadDependencies.js');
  }
  let lDep = allContent.find(x => x.file === '_loadDependencies.js');
  lDep.uses = [];
  lDep.usedBy = [];
  let _make = allContent.find(x => x.file === '_make.js');
  _make.usedBy = [];
}