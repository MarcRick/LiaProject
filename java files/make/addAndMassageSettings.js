/***
 * - Adjusts/unfolds some setting parameters
 * - Imports settings given in index.md
 */

export function addAndMassageSettings() {
  // "unpack" settings for sharp
  settings.resizeSettings = [
    settings.sharpScaleJpgsTo,
    settings.sharpScaleJpgsTo,
    { fit: 'inside' }
  ];
  settings.jpegSettings = [{
    mozjpeg: true,
    quality: settings.sharpJpgQuality
  }];

  // can't make PPTX without JPGs - but we can decide if to keep them
  settings.keepJPGs = settings.makeJPGs;
  settings.makePPTX && (settings.makeJPGs = 1);

  // readMarpSettings
  let x = readFileSync('./index.md', 'utf-8').split('---')[1];
  x.split('\n')
    .map(x => x.split(':').map(x => x.trim()))
    .forEach(([key, val]) => {
      if (!key || !val || key === 'marp') { return; }
      settings[key] = val;
    });
}