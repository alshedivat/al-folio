---
title: Spacing
status: Stable
source: https://github.com/primer/primer/blob/master/modules/primer-support/lib/variables/layout.scss
---

{:toc}

## Spacing scale
The spacing scale is a **base-8** scale. We chose a base-8 scale because eight is a highly composable number (it can be divided and multiplied many times and result in whole numbers), yet allows spacing dense enough for GitHub's UI. The scale's exception is that it begins at 4px to allow smaller padding and margin for denser parts of the site, from there on it steps up consistently in equal values of `8px`.

| Variable | Scale | Value |
| --- | --- | --- |
| $spacer-1 | 0 | 0 |
| $spacer-1 | 1 | 4px |
| $spacer-1 | 2 | 8px |
| $spacer-1 | 3 | 16px |
| $spacer-1 | 4 | 24px |
| $spacer-1 | 5 | 32px |
| $spacer-1 | 6 | 40px |

These variables are encouraged to be used within components and custom CSS. The spacing scale is also used for [margin](./utilities/margin) and [padding](./utilities/padding) utilities.

See [primer-marketing-support](../primer-marketing-support) for the extended spacing scale used for marketing needs and the related y-axis spacing utilities for [margin](../primer-marketing-utilities/docs/margin.md) and [padding](../primer-marketing-utilities/docs/padding.md).

## Em-based spacing
Ems are used for spacing within components such as buttons and form elements. We stick to common fractions for em values (and powers of 2 where possible) so that , in combination with typography and line-height, the total height lands on sensible numbers.

We aim for whole numbers, however, GitHub's body font-size is 14px which is difficult to work with, so we sometimes can't achieve a whole number. Less desirable values are highlighted in <span class="text-red">red</span> below.

| Variable | Fraction | Y Padding (em) | Total height at 14px | Total height at 16px |
| --- | --- | --- | --- | --- |
| $em-spacer-1 | 1/16 | .0625 | <span class="text-red">22.75</span> | 26 |
| $em-spacer-2 | 1/8 | .125 | <span class="text-red">24.5</span> | 28 |
| $em-spacer-3 | 1/4 | .25 | 28 | 32 |
| $em-spacer-4 | 3/8 | .375 | <span class="text-red">31.5</span> | 36 |
| $em-spacer-5 | 1/2 | .5 | 35 | 40 |
| $em-spacer-6 | 3/4 | .75 | 42 | 48 |

The variables listed above are preferred for use within components and custom CSS. To calculate values with other font-sizes or em values, we suggest using [Formula](http://jxnblk.com/formula/).
