---
layout: post
title: "Field Extensions"
date: 2023-01-12 11:12:00-0400
description: 
tags: math
categories:
---

**Pre-requisites** : Modular Arithmetic, Polynomial Long Division 

In this post we will understand field extensions using examples. We will start with some basic definitions and build up to the topic. Let us start with *Groups*.


#### Groups
---
A group is a set of elements $$G = \{a, b, c,...\}$$ and an operation $$\oplus$$ for which the following axioms hold:
* Closure : for any $$a, b \in G$$, the element $$ a \oplus b$$ is in $$G$$
* Associative : for any $$a, b, c \in G$$, $$(a \oplus b) \oplus c = a \oplus (b \oplus c)$$
* Identity : There is an identity element $$e$$ in $$G$$ for which $$a \oplus e = e \oplus a = a$$, for all $$a \in G$$ 
* Inverse : For each $$a \in G$$, there is an inverse $$(-a)$$ such that $$a \oplus (-a) = 0 $$

A group $$G$$ for which $$a \oplus b = b \oplus a$$, for all $$a, b \in G$$ is called *abelian* or *commutative*.

Some examples of groups : 
1. Set of integers $$\mathbb{Z}$$ with addition operation $$+$$ forms an abelian group.
2. Set $$\{0,1,2,....,n-1\}$$ denoted by $$\mathbb{Z}_n$$ under mod-$$n$$ addition, where $$n$$ is a positive integer

We will now introduce *Fields*.


#### Fields
---
A field is a set $$\mathbb{F}$$ of at least two elements, with two binary operation $$+$$ and $$*$$, for which the following axioms are satisfied :
* The set $$\mathbb{F}$$ forms an abelian group (whose identity is called 0) under the operation $$+$$
* The set $$\mathbb{F}^* = \mathbb{F} - \{0\} = \{a \in \mathbb{F}, a \neq 0\}$$ forms an abelian group (whose identity is called 1) under the operation $$*$$ 
* Distributivity : for all $$x, y, z \in \mathbb{F}$$, $$x*(y+z) = x*y +x*z$$

Some examples of fields :
1. Set of real numbers $$\mathbb{R}$$ under addition and multiplication
2. Set of complex numbers $$\mathbb{C}$$ under addition and multiplication
3. Set of rational numbers $$\mathbb{Q}$$ under addition and multiplication
4. Set $$\{0,1\}$$ under mod-$$2$$ addition and multiplication
5. Set $$\{0,1,2,....,p-1\}$$ denoted by $$\mathbb{F}_p$$ under mod-$$p$$ addition and multiplication, where $$p$$ is a prime number. These are called *Prime Fields*.

We can verify that all the above examples satisfy the field axioms. The sets in example (4) and (5) are finite thus they are examples of a *finite field*. Now let's state a theorem on extension of Prime Fields.

**Theorem 1** : Let $$\mathbb{N}$$ denote set of natural numbers. For all primes $$p \in \mathbb{N}$$ and $$k \in \mathbb{N}, k \geq 1$$ there exists a field with $$p^k$$ elements denoted by $$\mathbb{F}_{p^k}$$. $$\mathbb{F}_{p^k}$$ is called degree $$k$$ extension of $$\mathbb{F}_p$$. 

Some non-examples of fields :
1. Set of integers $$\mathbb{Z}$$ under addition and multiplication is not an example of field since multiplicative inverse does not exist for all non-zero elements of $$\mathbb{Z}$$.
2. Let $$p=2$$ and $$k=2$$ in **Theorem 1**. The set $$\mathbb{F}_4 = \{0,1,2,3\}$$ under mod-$$4$$ addition and multiplication is not a field since there is no multiplicative inverse for element $$2$$ i.e there does not exist an element $$x\in \mathbb{F}_4$$ such that $$2*x$$ mod $$4 = 1$$

In above example, we saw that $$\mathbb{F}_4 = \{0,1,2,3\}$$ is not a field but as per **Theorem 1** there exits a field with $$p=2$$ and $$k=2$$. We will see the construction of this field in further sections and in general see the construction of $$\mathbb{F}_{p^k}$$. But before that let's introduce *Commutative Rings*.

#### Commutative Rings
---
A commutative ring $$R$$ is a set with two binary operations $$+$$ and $$*$$, which satisfies the following axioms:
* The set $$R$$ forms an abelian group (whose identity is called 0) under the operation $$+$$
* The set $$R$$ is closed under multiplication i.e. for any $$a, b \in R$$, the element $$ a * b$$ is in $$R$$
* Multipication is associative i.e. for all $$a, b, c \in R$$, $$a*(b*c) = (a*b)*c$$
* Multiplicative Identity : for all $$a \in R$$, there is an multiplicative identity $$1$$ in $$R$$ for which $$a * 1 = 1 * a = a$$
* Multiplication is commutative i.e. for all $$a, b\in R$$, $$a*b = b*a$$
* Distributivity : for all $$a, b, c \in R$$, $$a*(b+c) = a*b +a*c$$


We can see that *Commutative Rings* satisfy all the *Field* axioms excluding the multiplicative inverse property i.e. in a commutative ring all non-zero elements need not have a multiplicative inverse.

Some examples of commutative ring :
1. Set of integers $$\mathbb{Z}$$ under addition and multiplication
2. Set of polynomials in variable $$X$$ with integer coefficients denoted by $$\mathbb{Z}[X]$$, under polynomial addition and multiplication
3. Set of polynomials in variable $$X$$ with coefficients in field $$\mathbb{F}$$ denoted by $$\mathbb{F}[X]$$, under polynomial addition and multiplication
 

We can verify that the above examples satisfy all the field axioms except that there are elements in these sets which do not have a multiplicative inverse.

Now before we construct $$\mathbb{F}_{p^k}$$, the degree $$k$$ extension of $$\mathbb{F}_p$$, let us go through polynomials.

#### Polynomials
---
Let us start by defining the degree of a polynomial. Let $$P$$ be a polynomial such that 

$$P=\sum_{i=0}^{t} f_i x^i$$ 

then the degree of $$P$$ denoted by $$deg(P)$$ is defined as $$deg(P) = \max_{i} \{f_i \neq 0\}$$.

Let $$R$$ be a commutative ring. Then $$R[X]$$ denotes the ring of polynomials in variable $$X$$ with coefficients in $$R$$.

A polynomial of degree $$\leq d$$ in $$R[X]$$ is given by $$ f(X) = f_0 + f_1 X + f_2 X^2 + .... + f_d X^d $$ where $$f_0, f_1, f_2,....,f_d \in R$$ and $$f_d \neq 0$$.

$$R[X]$$ is the union of all the polynomials over all degrees in $$\mathbb{N} \cup 0 $$.

$$
R[X] = \cup_{d \in \mathbb{N} \cup 0 } \{ \text{Polynomial of degree} \leq d\}
$$

**Division Lemma**

Let $$\mathbb{F}$$ be a field. Let $$\mathbb{F}[X]$$ denote the ring of polynomials in variable $$X$$ with coefficients in $$\mathbb{F}$$.

For all $$g$$, $$h$$ $$\in \mathbb{F}[X]$$ where $$h$$ is non-zero there exists unique $$q(X)$$, $$r(X)$$ $$\in \mathbb{F}[X]$$ such that
1. $$g = h \cdot q + r$$
2. $$deg(r) < deg(h)$$

Note that this is similar to Euclid's division lemma for integers.

**GCD Lemma**

Let $$g$$, $$h$$ $$\in \mathbb{F}[X]$$ where $$g$$ and $$h$$ are non-zero. Let $$I$$ be a set such that $$I(g,h) = \{u \cdot g + v \cdot h \| u,v \in \mathbb{F}[X] \}$$. Let $$p$$ be a non-zero polynomial of lowest degree in $$I(g,h)$$. Then $$p$$ is a GCD(g,h).

Note that this is similar to extended euclidean algorithm for integers.


Now we will define irreducible polynomials which are used in the definition of extension field $$\mathbb{F}_{p^k}$$. 


**Irreducible Polynomials** : Let $$f(X) \in \mathbb{F}[X]$$ be a polynomial with coefficients in $$\mathbb{F}$$. $$f(X)$$ is *irreducible* over $$\mathbb{F}$$ if $$f(X)$$ cannot be written as a product of two polynomials $$g(X)*h(X)$$ where $$g,h \in \mathbb{F}[X]$$ and $$deg(g), deg(f) \geq 1$$.

Examples:
1. Let $$\mathbb{F}$$ be a field of real numbers $$\mathbb{R}$$ then the polynomial $$f(X) = X^2 + 3X + 2$$ is reducible over $$\mathbb{R}$$ since $$f(X) = X^2 + 3X + 2 = (X+1)*(X+2)$$ whereas $$g(X)=X^2+1$$ is irreducible over $$\mathbb{R}$$ since it cannot be written as a product of two polynomials of degree greater than equal to 1.
2. Let $$\mathbb{F}$$ be a field of complex numbers $$\mathbb{C}$$ then the polynomial $$g(X)=X^2+1$$ is reducible over $$\mathbb{C}$$ since $$g(X)=X^2+1 = (X-i)*(X+i)$$ where $$i=\sqrt{-1}$$. 

Now we will state an important fact about irreducible polynomials. 

**Fact** : For all primes $$p$$ and $$d \in \mathbb{N}$$, there exists an irreducible polynomial of degree equal to $$d$$ in $$\mathbb{F}_p[X]$$ where $$\mathbb{F}_p$$ is the field $$\{0,1,2,...,p-1\}$$ and $$\mathbb{F}_p[X]$$ denotes the ring of polynomials over $$X$$ with coefficients in $$\mathbb{F}_p$$.

Now a polynomial of degree $$\leq d$$ in $$\mathbb{F}_p$$ can be written as $$ f(X) = f_0 + f_1 X + f_2 X^2 + .... + f_d X^d $$. The number of polynomials of degree $$\leq d$$ is $$p^(d+1)$$, total $$d+1$$ coefficients and each coefficient can take $$p$$ values from $$\mathbb{F}_p$$.

#### Field Extension ####

Now we will construct $$\mathbb{F}_{p^k}$$ using the theorems and definitions we have seen so far.

For $$k=1$$, $$\mathbb{F}_{p}$$ is the set $$\{0,1,2,3,...,p-1\} with $$mod p$$ addition and multiplication operations defined on it.

For $$k \in \mathbb{N} and k \neq 1$$, let $$g(X)$$ be a degree $$k$$ *irreducible* polynomial with coefficients in $$\mathbb{F}_{p}$$ i.e. $$g(X) \in \mathbb{F}_p[X]$$ and $$deg(g)=k$$. Then $$\mathbb{F}_{p^k}$$ is defined as 
1. Elements are from the set $$\{f(X) \in \mathbb{F}_p[X], deg(f) < k\}$$

Number of elements = Number of polynomial of $$deg(f) < k$$ in $$\mathbb{F}_p[X]$$ = $$p^k$$

2. Operations are polynomial addition and multiplication modulo $$g(X)$$

Now let us check that if the above definition of $$\mathbb{F}_{p^k}$$ satisfies the field axioms.
1. Commutativity, Associativity and Distributavity of $$*$$ on $$+$$ follows directly from the polynomial addition and multiplication modulo $$g(X)$$ operations
2. $$0$$ ia the additive inverse and $$1$$ is the multiplicative inverse
3. Existence and Uniqueness of additive inverse.

For every $$f(X) \in \mathbb{F}_p[X], deg(f) < k$$ there exists $$h(X) \in \mathbb{F}_p[X], deg(h) < k$$ such that $$f(X) + h(X) = g(X)$$. Taking modulo $$g(X)$$ on both sides $$f(X) +h(X) mod g(X)=0$$ i.e. $$h(X)$$ is additive inverse of $$f(X)$$

4. Existence and Uniqueness of multiplicative inverse 

For every $$f(X) \in \mathbb{F}_p[X], deg(f) < k$$ there exists $$h(X) \in \mathbb{F}_p[X], deg(h) < k$$ such that $$f(X) * h(X) = 1 mod g(X)$$. Moreover such an $$h(X)$$ is unique.

Proof: $$f(X) \in \mathbb{F}_p[X], deg(f) < k$$ and $$g(X) \in \mathbb{F}_p[X], deg(g) \eq k$$ is an irreducible polynomial $$GCD(f,g) = 1$$

Using the GCD lemma, $$I(g,f) = \{u \cdot f + v \cdot g | u,v \in \mathbb{F}_p[X] \}$$

$$\exists u,v \in \mathbb{F}_p[X]$$ s.t. $$u(X) \cdot f(X) + v(X) \cdot g(X) = 1$$. Taking mod $$g(X)$$ on both sides

$$u(X) \cdot f(X) = 0 mod g(X) $$. Thus $$u(X)$$ is an inverse of $$f(X)$$.

Using the division lemma, $$\exists q,r \in \mathbb{F}_p[X]$$ s.t. $$ v = q \cdot g + r $$ and $$ deg(r) < deg(g)=k$$

$$
(q \cdot g + r) f = 1 mod g
q \cdot g \cdot f + r \cdot f = 1 mod g
r \cdot f = 1 mod g
$$
Thus $$r$$ is the multiplicative inverse of $$f$$ in $$\mathbb{F}_{p^k}$$.

We have just shown that $$\mathbb{F}_{p^k}$$ satisfies the field axioms.

$$\mathbb{F}_{p^k}$$ is called a degree $$k$$ extension of $$$$\mathbb{F}_{p}$$.

Note that $$\mathbb{F}_{p} \subseteq \mathbb{F}_{p^k}$$ i.e. $$\mathbb{F}_{p}$$ is prime subfield of $$\mathbb{F}_{p^k}$$.

Note that $$\forall \alpha \in \mathbb{F}_{p^k} p \cdot \alpha = \underbrace{\alpha + \alpha + .... + \alpha}_\text{p times} = 0$$. $$p$$ is called the characteristic of $$\mathbb{F}_{p^k}$$. 

By convention characteristic of $$\mathbb{R}, \mathbb{C} and \mathbb{Q}$$ is $$0$$.

**Example**
Let $$p=2$$ and $$k=2$$ i.e. we will construct $$\mathbb{F}_{2^2}=\mathbb{F}_{4}$$ using the above definitions. 

Let $$g(X)$$ be a degree $$k=2$$ *irreducible* polynomial with coefficients in $$\mathbb{F}_{2}$$ i.e. $$g(X) \in \mathbb{F}_2[X]$$ and $$deg(g)=k=2$$.

Note that there are four polynomial of degree 2 in $$\mathbb{F}_2[X]$$ and the only irreducile polynomial is $$X^2+ X +1$$. The other three polynomials are reducile i.e.

$$
X^2 = X \cdot X
X^2 + X = X \cdot (X+1)
X^2 + 1 = (X+1) \cdot (X+1)
$$

Thus $$g(X)=X^2+ X +1$$

Now total number of elements in $$\mathbb{F}_{2^2}$$ is $$p^k=4$$. The elemets are from the set $$\{f(X) \in \mathbb{F}_2[X], deg(f)< 2\}$$ which is precisely the set $$\{ 0, 1, X, X+1\}.

The operations defined on $$\mathbb{F}_{2^2}$$ are polynomial addition and multiplication modulo $$g(X)=X^2+ X +1$$.

Let us add two elements from the set.
$$
X +(X+1) = 2X +1 mod X^2+ X +1
= 1 mod X^2+ X +1 \text{since 2mod2 = 0}
$$

The addition table for all the field elements is as follows:

{:class="table table-bordered"}
| + | $$0$$ | $$1$$ | $$X$$ | $$X+1$$ |
|    :----:   |    :----:   |    :----:   |    :----:   |    :----:   | 
| $$0$$ | $$0$$ | $$1$$ | $$X$$ | $$X+1$$ |
| $$1$$ | $$1$$ | $$0$$ | $$X+1$$ | $$X$$ |
| $$X$$ | $$X$$ | $$X+1$$ | $$0$$ | $$1$$ |
| $$X+1$$ | $$X+1$$ | $$X$$ | $$1$$ | $$0$$ |

Let us multiply two elements from the set.
$$
(X+1)\cdot(X+1) = X^2 + 2X +1 mod X^2+ X +1
= X^2 + 1 mod X^2+ X +1 \text{since 2mod2 = 0}
= X \text{using polynomial long division}
$$

The multiplication table for all the field elements is as follows:

{:class="table table-bordered"}
| * | $$0$$ | $$1$$ | $$X$$ | $$X+1$$ |
|    :----:   |    :----:   |    :----:   |    :----:   |    :----:   | 
| $$0$$ | $$0$$ | $$0$$ | $$0$$ | $$0$$ |
| $$1$$ | $$0$$ | $$1$$ | $$X$$ | $$X+1$$ |
| $$X$$ | $$0$$ | $$X$$ | $$X+1$$ | $$1$$ |
| $$X+1$$ | $$0$$ | $$X+1$$ | $$1$$ | $$X$$ |

#### Conclusion ####

#### References ####
1. Forney Notes
2. Bitcoi Notes