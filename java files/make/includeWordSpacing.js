/***
 * - Includes the word spacing as a css rule
 */

export function includeWordSpacing(html) {
  let { wordSpacingRem } = settings;
  html = html.split('</head>').join(/*css*/`
    <style>
    a-space {
      letter-spacing: ${wordSpacingRem}rem;
    }
    </style>
    </head>
  `);
  return html;
}