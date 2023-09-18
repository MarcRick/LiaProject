/***
 * - Helper for space width calculation during letter spacing
 */

export function nonJustify() {
  let head = document.querySelector('head');
  let style = document.createElement('style');
  style.classList.add('non-justify')
  style.innerHTML = '* {text-align: left !important;}';
  head.append(style);
}