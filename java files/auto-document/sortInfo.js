function list(x) {
  x = x.map(x => x.file);
  console.log(x.length);
  console.log(x);
}

export function sortInfo(all) {
  function recurse(part) {
    !sorted.includes(part) && sorted.push(part);
    (part.file === 'includeLetterSpacer.js' ? part.uses : [...part.uses]
      .sort((a, b) => a.uses.length > b.uses.length ? 1 : -1))
      .forEach(recurse);
  }
  let sorted = [];
  all.forEach(recurse);
  let loadDep = sorted.find(x => x.file === '_loadDependencies.js');
  sorted.splice(2, 0, loadDep);
  sorted.splice(sorted.lastIndexOf(loadDep), 1);
  // list(sorted);
  all.length = 0;
  all.push(...sorted);
}