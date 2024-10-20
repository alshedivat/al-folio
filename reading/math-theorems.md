<!-- ---
layout: page
permalink: /reading/math-results
title: Math Results
description: A collection of nifty, interesting, elegant, cool math results.
nav: false
--- -->

A collection of nifty, interesting, elegant, cool math results.

- [Real Analysis and Calculus](#real-analysis-and-calculus)
- [Linear Algebra](#linear-algebra)
- [Abstract Algebra](#abstract-algebra)
- [Computability Theory](#computability-theory)


## Real Analysis and Calculus

**Reals as a vector space over the rationals.**
The reals can be defined as the set of all Cauchy sequences of rationals, with addition and multiplication defined component-wise. This makes the reals a vector space (of infinite dimension) over the rationals.
If the axiom of choice is true, then there exists a basis for this vector space.

**Arc length.**
The length of a curve given by the function $f(x)$ on the interval $[a, b]$ is given by the integral $$\int_a^b \sqrt{1 + (f'(x))^2} \, dx$$.

**Bolzano-Weierstrass Theorem.**
Every bounded sequence has a convergent subsequence.

**Cauchy Sequences.**
A sequence is Cauchy if for every $\epsilon > 0$, there exists an $N$ such that for all $n, m > N$, $$\| \mathbf{x}_n - \mathbf{x}_m \| < \epsilon$$.
A sequence $$\{ \mathbf{x}_n \} \in \mathbb{R}^n$$ is convergent iff it is Cauchy.

**Connectedness, Pathwise and Not.**
A set is connected iff it cannot be written as the union of two disjoint nonempty open sets.
A set is path-wise connected iff for every pair of points in the set, there exists a continuous function that maps the interval $[0, 1]$ to the set and maps the endpoints to the given points.
If a set is path connected, then it is connected. The converse is not true: consider the Topologist's sine curve, defined as

$$S = \{ (x, \sin(1/x)) \mid 0 < x \leq 1 \} \cup \{ (0, y) \mid -1 \leq y \leq 1 \}$$

**Leibniz's proof for the derivative of a quadratic.**
If $$x$$ changes by $$\delta x$$, then $$y = x^2$$ should change by $$y + \delta y = (x + \delta x)^2 = x^2 + 2x\delta x + (\delta x)^2$$. Relabel $$\delta x, \delta y$$ as $$dx, dy$$ and as they become 'infinitely small', then $$(\delta x)^2$$ gets infinitely smaller. Also subtract $$y = x^2$$. So we get $$dy = 2x dx$$, or $$dy/dx = 2x$$.

**Definition: Riemann integrability.**
$$f$$ is integrable on $$[a, b]$$ if
for every $$\epsilon > 0$$ there is a partition $$P$$ of $$[a, b]$$ such that $$U(f, P) - L(f, P) < \epsilon$$,
where $$U(f, P)$$ is the upper sum and $$L(f, P)$$ is the lower sum.

**Measurability, zero-content, and integrability.**
A set has zero content if for every $$\epsilon > 0$$, there exists a finite collection of intervals such that the set is contained in the union of the intervals and the sum of the lengths of the intervals is less than $$\epsilon$$.
A bounded set is integrable even if it has a subset of zero content.
For instance, the Cantor set defined by removing the middle third of the interval $[0, 1]$ and then removing the middle third of the remaining intervals, and so on until infinity; a function defined on the Cantor set is integrable.

## Linear Algebra

**Rank-Nullity Theorem.**
For a linear transformation $T: V \to W$, the rank-nullity theorem states that $$\text{rank}(T) + \text{nullity}(T) = \dim(V)$$.

**Closed-form solution for the *n*th Fibonacci number** using matrix decomposition. 
Begin with the following definition of the Fibonacci sequence, and then raise the given matrix to the power of *n* and decompose it to find a closed-form solution for the *n*th Fibonacci number.
$$\begin{pmatrix} F_n \\ F_{n+1} \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} F_{n-1} \\ F_{n} \end{pmatrix}$$


## Abstract Algebra

**Cool isomorphisms.**
- $$\mathbb{R}[x]/(x^2 + 1) \cong \mathbb{C}$$.
- $$\mathbb{H} \cong \mathbb{C} \times \mathbb{C}$$ (where $$\mathbb{H}$$ is the set of quaternions).
- $$\mathbb{R} / \mathbb{Z} \cong \{ z \in \mathbb{C} : \vert z \vert = 1 \}$$.
- The ring of $$n \times n$$ matrices over a field $$k$$ is isomorphic to the ring of endomorphisms of a finite-dimensional vector space $$V$$ over $$k$$ with dimension $$n$$.
- The field $$K$$ of matrices with form $$\begin{pmatrix} a & b \\ -b & a \end{pmatrix}$$ is isomorphic to the field $$\mathbb{C}$$.
- The quotient group $$\mathbb{SL}_n(\mathbb{R}) / \mathbb{GL}_n(\mathbb{R})$$ is isomorphic to the multiplicative group $$\mathbb{R}^+$$.
    - The special linear group is the set of $$n \times n$$ matrices with determinant 1
    - The general linear group is the set of $$n \times n$$ matrices with non-zero determinant
- The quotient group $$\mathbb{C}* / \{ x \in \mathbb{C} : \vert x \vert = 1 \}$$ is isomorphic to the multiplicative group $$\mathbb{R}^+$$.
    - "Taking the complex numbers modulo the unit circle is the same as taking the positive real numbers."

**Bezout's Theorem.**
For any two integers $$a, b$$, there exist integers $$x, y$$ such that $$ax + by = \gcd(a, b)$$.

**Units in $$\mathbb{Z}_n$$.**
The units of a ring are the elements with a multiplicative inverse.
The units in $$\mathbb{Z}_n$$ are the integers $$a$$ such that $$\gcd(a, n) = 1$$.
Note that units are elements with a multiplicative inverse.

**Fields and Integral Domains.**
Every field is an integral domain, but not every integral domain is a field.
(A field is a commutative ring with every element a unit.
An integral domain is a commutative ring with no zero divisors:  if $$ab = 0$$, then $$a = 0$$ or $$b = 0$$.)

**Eisenstein's Criterion.**
If a polynomial $$f(x) = a_nx^n + a_{n-1}x^{n-1} + \cdots + a_0$$ has integer coefficients and there exists a prime $$p$$ such that $$p \nmid a_n$$, $$p \mid a_{n-1}, \ldots, a_0$$, and $$p^2 \nmid a_0$$, then $$f(x)$$ is irreducible over the rationals.

**Irreducibility of polynomials.**
$$p(x)$$ is irreducible in $$F[x]$$ iff $$F[x]/(p(x))$$ is a field.

**Extension field for polynomials.**
Let $$F$$ be a field and $$p(x)$$ an irreducible polynomial in $$F[x]$$. Then the field $$F[x]/(p(x))$$ is an extension field of $$F$$ containing the root of $$p(x)$$.

**First Isomorphism Theorem for Rings.**
If $$\phi: R \to S$$ is a ring homomorphism, then $$\ker(\phi)$$ is an ideal of $$R$$ and $$R/\ker(\phi) \cong \text{im}(\phi)$$.

**First Isomorphism Theorem for Groups.**
If $$\phi: G \to H$$ is a group homomorphism, then $$\ker(\phi)$$ is a normal subgroup of $$G$$ and $$G/\ker(\phi) \cong \text{im}(\phi)$$.

**Prime Ideals.**
An ideal is prime if $$ab \in I$$ implies $$a \in I$$ or $$b \in I$$.
Let $$P$$ be an ideal in a commutative ring $$R$$ with identity.
Then $$P$$ is a prime ideal iff $$R/P$$ is an integral domain.

**Maximal Ideals.**
An ideal is maximal if it is not contained in any other proper ideal.
Let $$M$$ be an ideal in a commutative ring $$R$$ with identity.
Then $$M$$ is a maximal ideal iff $$R/M$$ is a field.

**Relation between rings and groups.**
Every ring is a group under addition, and no ring is a group under multiplication.

**Abelian groups.**
Every group of order 5 or less is abelian.

**Cayley's Theorem.**
Every group is isomorphic to a subgroup of the symmetric group on the group's elements.

**Cycles.**
Every permutation in $$S_n$$ is a product of disjoint cycles.

**Lagrange's Theorem.**
If $$G$$ is a finite group and $$H$$ is a subgroup of $$G$$, then the order of $$H$$ divides the order of $$G$$: $$|G| = |H| \cdot [G:H]$$, where $$[G:H]$$ is the index of $$H$$ in $$G$$ (the number of left cosets of $$H$$ in $$G$$).

**Isomorphisms to prime modulo groups.**
Every group of prime order, with no subgroups, or simple and abelian is cyclic and isomorphic to $$\mathbb{Z}_p$$.

**Finite abelian groups.**
Every finite abelian group is isomorphic to a Cartesian product of cyclic groups of prime power order.

**Sylow's Theorems.**
A Sylow $$p$$-subgroup of a group $$G$$ is a maximal $$p$$-subgroup of $$G$$.
If $$G$$ is a finite group and $$p$$ is a prime dividing the order of $$G$$, then
- There exists a Sylow $$p$$-subgroup of $$G$$.
- All Sylow $$p$$-subgroups are conjugate.
- The number of Sylow $$p$$-subgroups is congruent to 1 modulo $$p$$ and divides the order of $$G$$.

**Group actions.**
A group action of a group $$G$$ on a set $$X$$ is a homomorphism $$\phi: G \to S_X$$, where $$S_X$$ is the set of permutations of $$X$$.
The orbit of an element $$x \in X$$ is the set of all elements in $$X$$ that $$x$$ can be mapped to by elements of $$G$$.
The stabilizer of an element $$x \in X$$ is the set of all elements in $$G$$ that fix $$x$$.
The orbit stabilizer theorem: $$|G| = |G_x| \cdot |O_x|$$, where $$G_x$$ is the stabilizer of $$x$$ and $$O_x$$ is the orbit of $$x$$.


---


## Computability Theory

*Branching Programs.*
Every function $$f : \{0, 1\}^n \to \{0, 1\}$$ can be computed by a branching program of width 5 and length $$O(4^d)$$.

*Circuits.*
Every function can be computed by a circuit of size at most $$O(2^n / n)$$.

*Time Hierarchy.*
If $$r, t$$ are time-constructible functions satisfying $$r(n) \log r(n) = o(t(n))$$, then $$\text{DTIME}(r(n)) \subsetneq \text{DTIME}(t(n))$$.

*Space Hierarchy.*
If $$q, s$$ are space-constructible functions satisfying $$q(n) = o(s(n))$$, then $$\text{DSPACE}(q(n)) \subsetneq \text{DSPACE}(s(n))$$.

*Circuit Hierarchy.*
Every function $$f: \{0, 1\}^* \to \{0, 1\}$$ is in $$\text{SIZE}(2^n / n)$$.
For every large enough $$n$$, there is a function $$f : \{0, 1\}^n \to \{0, 1\}$$ that cannot b ecomputed by a circuit of size $$2^n / 3n$$.

*TQBF*.
The $$\text{TQBF}$$ function maps the set of totally quantified boolean formulas to 0 or 1.
TQBF is $$\textbf{PSPACE}$$-complete, meaning that every function in $$\textbf{PSPACE}$$ can be reduced in polynomial time to $$\text{TQBF}$$.

*SAT*.
There is no Turing machine computing circuit-satisfiability in $$O(n)$$ time and $$O(\log n)$$ space.

*Matrix product checking.*
To check if $$A \times B = C$$ for three $$n \times n$$ matrices $$A, B, C$$, randomly sample $$r \in \{0, 1\}^n$$ and check if $$ABr = Cr$$ repeatedly. This randomized algorithm takes only $$O(n^2)$$ time and has exponentially decreasing error rate.

*A complication for proving $$P ?= NP$$.*
There exists an oracle $$A$$ such that $$P^A = NP^A$$, and an oracle $$B$$ such that $$P^B \neq NP^B$$.
Therefore any proof on $$P ?= NP$$ may not work in relativized worlds where access to both is permitted, whereas other familiar proofs to relativize.

*The true identity of $$\textbf{ZPP}$$.*
$$\mathbf{ZPP}$$ is the class of boolean functions with an algorithm which never makes an error, but whose expected running time is polynomial in $$n$$.
$$\mathbf{RP}$$ is the class of boolean functions which can be computed by a machine which is always correct when $$f(x) = 0$$ and which is $$2/3$$ correct when $$f(x) = 1$$.
$$\mathbf{ZPP} = \mathbf{RP} \cap co\mathbf{RP}$$

*The permanent* of an $$n \times n$$ matrix $$M$$ is $$\sum_\pi \Pi_{i=1}^n M_{i, \pi(i)}$$ where the sum is taken over all permutations $$\pi : [n] \to [n]$$.
The class $$\#P$$ contains the functions for which the number of satisfying assignments can be computed in polynomial time.
The permanent is $$\#P$$-complete.

$$\mathbf{IP} = \mathbf{PSPACE}$$.
That is, the set of functions computable with an interactive polynomial verifier with high probability is equal to the set of functions computable in polynomial space.

*The blind man.*
A blind man is trying to buy a red rag and a blue rag.
But he is not sure if the salesman is trying to trick him or not. The salesman could, for instance, give him two red rags or two blue rags.
The blind man shuffles rags behind his back, but keeps track of the identities of each (so at first he doesn't know the true colors, but he knows which rag is which).
He randomly pulls out a rag and asks the salesman what color it is. Then, he puts it behind his back and shuffles again, repeating this several times.
If the salesman gives two conflicting answers for the same rag (e.g., calling it red one time and blue another time), then the blind man knows that he is lying.
If, on the other hand, the salesman consistently calls one rag blue and the other rag red, then the blind man is sure that he indeed has one blue and one red rag.
The moral of this story is that even a "handicapped" verifier can compute powerful functions with randomness and interaction.
