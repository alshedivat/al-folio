---
layout: post
title: Building a Balanced Computer
date: 2024-02-01 19:00:00-0000
description: On the journey to a better computer design
tags: ternary computer architecture programming
categories: ternary-computer
related_posts: false
toc:
  sidebar: left
---

## Pointless blathering

Peel back all the abstractions of a modern computer, right down to the nano-scale transistor, and you find a ballet of ones and zeros carefully orchestrated by the collective knowledge of a decade of programming. Digital magic, some might say.

Those binary digits are of course, abstractions themselves. A nice counting excersise on the charges that move around when electric fields are present. My education wasn't in transistor design, so I can't say much to their operation, but I am a physicist by education. To me, the electric field is an example of a much more beautiful notion than pushing numbers around. And there is, of course, a problem with the numbers we currently push around.

### The point

As anyone might tell you, the electric field (and particles that interact with it) can have one of *three* states, not just the measley *two* that we've settles on for computing. A much more beautiful computer should use this inherent balanced nature, and contain three states itself:
Now, we could represent this with unitary numbers: `-1`, `0`, `1`, but seeing ones and zeros again might lead our thoughts astray into the binary world. Instead, we'll look even more elementary. Our computer will use the states `-`, `0`, `+` to perform our operations.

Further down the line, we'll be writing code for this computer, where we may switch to `N`,`O`,`P` notation due to each character having similar heights and widths, making runs of characters a little neater:

`0+-+0--+0-+++-+---+-+` Vs. `OPNPONNPONPPPNPNNNPNP`

### A counting exercise

Having the symbols in place is all well and good, but we should intuit about their usage. We have a zero (neutral) state, so we can write `0` just as well as decimal, and we even have a `+`, which works just as well as `1`, but then we hit the first problem: Our only remaining symbole `-`, should really represent `-1`.

As per standard placewise notation, each place represents the next power of your *base*. so when we run out of symbols in decimal, we just tack on the next symbol to the front and continue going.
Well, strictly speaking there's an infinite number of `0` leading this, and the next place increments when you can no longer increment the following place, but many people don't have the time to write finitely many zeros, let alone infinitely.

Do we return to `0`, as decimal does? Let's include the leading `0` so we can see the increments working:

|    0   |    1   |    2   |      3 |    4   |    5   |
| :----: | :----: | :----: | :----: | :----: | :----: |
| `0000` | `000+` | `00+0` | `00++` | `0+00` | `0+0+` |

Of course not! we've just reinvented binary, how garish. Besides, our intuition would tell us the value `10` represents `b^1`, where b is the size of our base. We have `3` states, so really `10 -> 3`.
We loop back to the smallest symbol. It just happens that in decimal, `0` *is* the smallest symbol:

|    0   |    1   |    2   |    3   |      4 |      5 |
| :----: | :----: | :----: | :----: | :----: | :----: |
| `0000` | `000+` | `00+-` | `00+0` | `00++` | `0+--` |

Much nicer, and if we had taken a shortcut, and remembered how numbers were constructed, we would have arrived at the same definition for two:

using only the values `1`, `0`, `-1`, and the powers of three:

`2 = (3^1)(1) + (3^0)(-1)`

This is the three value system known as [*balanced ternary*](https://en.wikipedia.org/wiki/Balanced_ternary), something you may often see written using `T`, `0`, `1`, as T looks awfully like a one with the overbar attached, but we've covered numbers looking a little too binary-esque for our purposes.

### Why bother with three anyway

If my arguments about an inherently balanced system that better utilises all of the symbols handed to us by the laws of nature itself haven't swayed you, either you're in the wrong place, or these final arguments might:

#### Negatives are easy

Negative numbers in standard writing are often given by the `-` symbol prepended to the number, or in fancier circles, with an overbar across the whole number. This doesn't quite work in computers, where you can only use `0` and `1`, so a common method is to use [*two's complement*](https://en.wikipedia.org/wiki/Two%27s_complement), where the highest order bit in your notation is `-(2^n)`, instead of the standard `2^n`

That is, `100` represents `-4` in two's complement, rather than `4`.

It works, it's servicable, but you end up with a very uneven spread of representable values:

| `000` | `001` | `010` | `011` | `100` | `101` | `110` | `111` |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 1 | 2 | 3 | -4 | -3 | -2 | -1 |

Theres no way to write `4` in just those three bits, and the entire counting sequence is very unsymmetric.

If only there were an inherent negative symbol built into the number system, then you could write negative numbers without resorting to a trick, in such a way that all positive and negative numbers look similar, and a negative is writable with the same number of digits as it's positive value...

And here lies our saving grace, balanced ternary:

`-+` represents `(-1)(3^1) + (1)(3^0)`, or `-2`, and we didn't have to resort to trickery at all! Actually, lets count from -4 again, and see how it stacks:

| `--` | `-0` | `-+` | `0-` | `00` | `0+` | `+-` | `+0` | `++` |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 |

Not only are `--` (`-4`) and `++` (`4`) perfect oposites of eachother, but we could write `4` in the first place!

And how do you invert a number in this system? You simply swap `-` with `+`, and vice versa! much easier than flipping *all* bits and incrementing by one when working with binary.

Admittedly, this is a benefit of any balanced numbering system, but ternary is better than balanced quinary, heptenary, and upwards, for another reason.

#### Radix economy

Did you notice that writing `4` in binary requires 3 bits (`100`), or 4 bits if using twos complement (`0100`).
Balanced ternary required only two `++`.
Quinary, and bases larger than `4`, will of course require only 1 symbol (`4`).

Okay, so why don't we use a larger base? lets compare:

| Base | Digits per base | 797638 in base | Digits to write 797638 | 
| :----------- | :------------: | :------------: | :------------: |
| Binary | 2 | `0b11000010101111000110` | 20 |
| Balanced Ternary | 3 | `+-------0++0++` | 14 |
| Decimal | 10 | `797638` | 6 |
| [binhenbihenoctohentetra-<br>heptasnasnasnabihept-<br>unhexagesimalary](https://www.xanthir.com/hex/base-names/) | 797638 | `10` | 2 |

We need some way of counting both the digits per base, b, and the digits to represent a given number, N.
Enter [*Radix Economy*](https://en.wikipedia.org/wiki/Radix_economy), so given as `E(b,N) = b floor( log(N) + 1) ~ b ln(N) / ln(b)`.
So how do we compare across all numbers? Why we take some limits: `E(b,N)/ln(N) ~ b/ln(b)`

The most efficient base, that with the lowest radix economy, would be `e` (https://www.wolframalpha.com/input?i=b+%2F+ln%28b%29). This would be a *natural* choice, except for the whole transcendental nature making finite numbers... difficult... to write. What is the most efficient integer base you might ask?

Well, you may not have seen my argument coming form a mile away, but its `3`. Ternary perfectly balances using minimal symbols against minimising number length, while maintaining the ability to write rational numbers as terminating values. This really justifies those `e = π = √g = 3` arguments you see in physics and engineering meme circles.
Side note, `π^2` is actually a decent approximation of `g` (earths gravity), moreso than `10`.