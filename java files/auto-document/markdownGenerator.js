export function markdownGenerator(
  md, file, exports, description, uses, usedBy, cComplexity
) {
  md.push([
    `## ${file}`,
    '',
    '### Description',
    `- ${description.split('\n* ').map(x => x.slice(3).trim()).join('\n')}`,
    '',
    exports.length ? `### Exports\n ${exports.map(x => '* ' + x).join('\n')}` : '',
    uses.length ? `\n\n### Uses\n ${uses.map(x => '*' + x.exports.join(', ') + `* from [${x.file}](#${x.file.toLowerCase().replace(/\./g, '')})`).map(x => '* ' + x).join('\n')}` : '',
    usedBy.length ? `\n\n### Used by\n ${usedBy.map(x => '*' + x.exports.join(', ') + `* from [${x.file}](#${x.file.toLowerCase().replace(/\./g, '')})`).map(x => '* ' + x).join('\n')}` : '',
    '\n### Code\n\n',
    `*File:* [make/${file}](make/${file})`,
    `\n*Cognitive Complexity:* ${cComplexity}`,
    '',
    '```js',
    `[theCodeHere]`,
    '```'
  ].join('\n'));
}