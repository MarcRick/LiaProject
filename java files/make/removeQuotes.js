/***
 * - Remove three different types of quotes from a string
 */

export function removeQuotes(x) {
  return x
    .split('"').join('')
    .split("'").join('')
    .split('&quot;').join('')
}