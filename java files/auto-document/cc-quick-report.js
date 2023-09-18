/* report on cognitive complexity */

import { getFolderOutput } from 'cognitive-complexity-ts';
import { join as pathJoin } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

async function doReport() {
  let dir = pathJoin(__dirname, '../', 'make');
  let report = await getFolderOutput(dir);
  report = Object.fromEntries(
    Object.entries(report)
      .map(([key, val]) => [key.padEnd(30, ' '), val.score])
      .sort((a, b) => {
        if (a[1] === b[1]) { return a[0] > b[0] ? 1 : -1 }
        return a[1] > b[1] ? -1 : 1;
      })
  );
  console.log(`\n${' '.repeat(12)}COGNITIVE COMPLEXITY`);
  console.table(report);
  console.log('');
}

doReport();