/***
 * - Compress the PDF using Ghostscript
 */

export function compressPDF() {
  let { ghostScriptPdfQuality: q } = settings;
  execSync(
    `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.7 ` +
    `-dPDFSETTINGS=/${q} -dNOPAUSE -dQUIET` +
    `-dBATCH -sOutputFile=dist/index.pdf index.pdf`
  );
}