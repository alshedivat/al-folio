---
layout: post
title: Why do we use SU(2) in Quantum Mechanics instead of SO(3)
image: /assets/img/schrodinger_eq.jpg
description: When we study rotation symmetry in quantum mechanics SU(2) is tipically used instead of SO(3). Why is it so is tipically not well explained in undergraduate courses.
---

## Symmetries and Quantum Mechanics

Symmetries are a really powerful concept commonly used in physics. Think about [Noether's theorem](https://en.wikipedia.org/wiki/Noether%27s_theorem), for every symmetry of the system there is a corresponding conserved quantity. This conserved quantites put certain constraints on the dynamics of the system, i.e. not everything is allowed and this is pretty good news for us, as it narrows down the set of possible solutions. Take a simple example, the [ellastic collision](https://en.wikipedia.org/wiki/Elastic_collision) of two objects in classical mechanics; just using conservation of momentum and energy even a secondary school student can solve this problem. In particle physics, if you have charge conservation even though the particle can desintegrate into many other lighter particles, you know that the sum of the charges must still be the same---again restricting the space of possible solutions.

Furthremore, symmetries have a group structure, in other words, the combination of two symmetry transformations is a symmetry transformation of the same kind (two composed rotations are still a rotation). Therefore usually symmetries and groups come hand in hand, and every symmetry is represented by a group. In this particular case we are going to talk about rotations or in more mathematical terms the $SO(3)$ group. 

As an undergraduate one valuable thing that I learned is that is better to study directly from books rather than lecture notes taken during the lecture. What I realized is that for every subject there are always these two or three books which are master pieces. In general all other books would be less deep, leaving many gaps unfilled, or will just refer to these master pieces.
One of my favourite books about quantum mechanics and quantum field theory is *Quantum Theory of Fields: Foundations* from Steven Weinberg. If you really want to go deep into quantum mechanics and quantum field theory I strongly recommend you to at least take a look at its three first chapters.

In the chapter 2.2 Weinberg explains how symmetries are realized in quantum mechanics: in the 1930's Wigner proved that any symmetry transformation must be done through either a linear unitary operator U:

$$
\begin{aligned}
\langle \psi U | U \phi \rangle &= \langle \psi  |  \phi \rangle \\
U(\xi | \psi \rangle + \eta | \phi \rangle) &= \xi U| \psi \rangle + \eta U | \phi \rangle
\end{aligned}
$$

or an antilinear and antiunitary operator U:

$$
\begin{aligned}
\langle \psi U | U \phi \rangle &= \langle \psi  |  \phi \rangle \\
U(\xi | \psi \rangle + \eta | \phi \rangle) &= \xi^* U| \psi \rangle + \eta^* U | \phi \rangle
\end{aligned}
$$

on the states of the Hilbert space. The set of symmetry transformations are usually defined via a group action---if you are not familiar with group theory I strongly recommend you to take a look at [this](https://arxiv.org/pdf/math-ph/0005032.pdf) lecture notes from Brian C. Hall. So given a group which represents the symmetry we want, in this case $SO(3)$, we need to find those matrices $U$ which fulfill Wigner's theorem, i.e. we need to find a map $SO(3) \to U(n)$ where $U(n)$ is the set of $n \times n$ unitary matrices. This is called a **unitary representation**---again if you do not know what a represenation from a group is check the lectures from Brian. 

Bottom line: given a group $G$ if this group is a symmetry of the quantum system there must exist *at least* one unitary representation of the group. But given a group how many inequivalent and **irreducible** representations are there? Well in the case of $SO(3)$ it is well known that there exist a unitary irreducible---any representation can be decomposed as a direct sum of irreducible ones---representation for every odd dimension $d$, i.e. for every $d = 2l+1$, with $l\in \mathbb{N}$. 

## Projective Representations

Let's start talking about what a represenation is:
a representation of a group $G$ on a vector space $V$ is a map $\rho: \, G \to \text{GL} (V)$, such that the group operation is preserved $\rho(g_1 \cdot g_2) = \rho(g_1)\cdot \rho(g_2)$---i.e. the map is a group homomorphism. But as Wigner told us, for quantum mechanics we are not interested in any representation but rather just on the subset of representations which are (anti)unitary. Therefore the map is not the general map $\rho: \,G \to \text{GL}(V)$ but instead $\pi: \, G \to \text{U}(V)$ where $\text{U}(V)$ is the set of unitary matrices in the vector space $V$.


But remember in your first course about quantum mechanics, they taught you that two vectors that differ by a phase are equivalent from a physical point of view, namely they represent the same physical state. Therefore we are allowed to relax slightly the conditions imposed by a representation. Instead if we find a map $\pi$ which is the analogous of a representation but up to a phase:

$$
U(g_1)\cdot U(g_2) = e^{\phi(g_1, g_2)} U(g_1 \cdot g_2)
$$

we are still good to go. 

Remember what I told you in the previous section that $SO(3)$ has a representation in every vector space of odd dimension $d$? It turns out that $SO(3)$ has a projective representation for all vector spaces of integer dimension $d \in \mathbb{N}$. The representations for even dimension are called [spinorial representations](https://en.wikipedia.org/wiki/Spin_representation). More generally, for any projective unitary representation of $SO(3)$ we have:


\begin{equation}
U(R_1)\cdot U(R_2) = \pm U(R_1 \cdot R_2)
\label{eq:projective}
\end{equation}

The representations of odd dimension they always have a positive sign (integer spin) while the representations of even dimensions (half integer spin) wil have a positive or negative sign depending on how the elements $R_1$ and $R_2$ are connected in the corresponding group.


## Relation between SU(2) and SO(3)

Projective representations can arise in two ways:

- Algebraically: if the central charge of the Lie algebra can not be removed.

- Topologically: If the group is not simply connected.

Because the Lie algebra of $SO(3)$ is semi-simple there is a general theorem which states that any central charges in semi-simple Lie algebras may always be removed by a redifinition of its generators. On the other hand $SO(3)$ is not simply connected, therefore all its projective representations originate from the topology. In fact, $SO(3)$ is *doubly* connected, informally this means that for any loop to be contractible to a point it must go around the manifold twice. 

Now let's listen to the master, Weinberg explains (page 90):

>  Even though a Lie group $G$ may not be simply connected, it can always be expressed as $C/H$, where $C$ is a simply connected group known as the [**universal covering group**](https://en.wikipedia.org/wiki/Covering_group) of $G$, and $H$ is an invariant subgroup of $C$.

In the case of $SO(3)$ the universal cover is $SU(2)$ and the invariant subgroup is $\mathbb{Z}_2 = \\{1,-1\\}$. The universal cover has no intrinsic projective representations, therefore all its representations are in the same footing, i.e. there is no phase anymore.

## Differences between SU(2) and SO(3) invariance

Here comes the tricky part. Again we must quote Weinberg (p. 89):

> Equation \eqref{eq:projective} imposes a [superselection rule](https://arxiv.org/pdf/0710.1516.pdf): we must not mix states of integer and half-integer spin.


and again:

> Instead of working with projective representations and imposing a superseleciton rule, we can just as well expand the Rotation group, taking it as $SU(2)$ itself, instead of $SU(2)/Z_2$ as before. Ordinary rotation invariance forbids transitions between states of integer and half-integer total spins, so the only difference is that now the group is simply-connected, and it therefore has only ordinary representations, not projective representations, so that we cannot infer a superselection rule.

So be careful because while the original $SO(3)$ group imposed superselection rules---due to its projective representations---the universal cover $SU(2)$ do *not* impose them. Then it continues:

> it may or it may not be possible to prepare physical systems in arbitrary superpositions of states, but one cannot settle the question by reference to symmetry principles, because whatever one thinks the symmetry group of nature may be, there is always another group whose consequnces are identical except for the absence of superselection rules.

The corollary is:

$$
SU(2) \text{ invariance} + \text{superselection rules} 
\equiv SO(3) \text{ invariance} 
$$