/* 
   Thomas Frank 2023 
   * Make a self-contained html file from MARP Markdown
     (includes css, fonts and images - no external dependencies)
   * Make a PDF file from MARP Markdown (via the html file)
   * Also scales and jpg compresses images in the files
   * And uses GhostScript to compress the PDF
*/

/***
 * - Load/import all JS code in the make folder
 * - Turn every imported asset into a global variable
 * - Calls _make() to start the conversion process
 */

import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// import all scripts in this folder and start _make
(async () => {
  process.chdir(__dirname);
  for (let file of readdirSync('./')) {
    file !== '_index.js' && file.slice(-3) === '.js' &&
      Object.assign(globalThis, await import('./' + file));
  }
  process.chdir('../');
  _make();
})();