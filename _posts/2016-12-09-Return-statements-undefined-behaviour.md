---
layout:     post
title:      Yet another lesson on undefined behavior
date:       2016-12-09 8:00
summary:    Return statements in C and C++
categories: cpp
tags:       [c, c++]
---

Recently I have started a completely new project: a framework for benchmarking linear algebra code in C++, including an interfacing for the most popular Expression Templates and Smart ET libraries, such as Eigen, Blaze or Armadillo. Setting up was quite usual: write CMake build scripts, install external libraries and implement basic benchmarking to verify if my approach does not introduce a measurable overhead. The first example has been finished, built, run... and a segfault. Run again, works fine. One more try, a segfault again. Quick check with Valgrind which suggests operation on uninitialised values in a destructor, a lot of playing with code to see if I may be overwriting some parts of memory and finally I find the problem here:

```c++
template<typename Duration, typename F, typename... Args>
static auto call(basic_benchmarker<Duration> & b, F && f, 
	Args &&... args) -> std::result_of_t<F(Args...)>
{
	f(std::forward<Args>(args)...);
}
```

This is a part of helper class using SFINAE to call benchmarked function properly, not knowing if it takes an additional argument allowing to access benchmarker and define clocks inside. It should be quite obvious why my code has been failing: a missing return statement. I did not enable warnings in CMake scripts and somewhere deep in my brain was a thought that "missing return is not important as long as the returned value is ignored". I couldn't be more wrong. In fact, it is a perfect example of an undefined behaviour in C++.
 
To find out why I have been so convinced that my code is safe, I took a look at different C and C++ standards. It is not easy to find drafts of older standards, [although StackOverflow is helpful one more time](http://stackoverflow.com/questions/17014835/where-can-i-find-the-c89-c90-standards-in-pdf-format). 
Links to pdfs or web versions of drafts are posted in each section; as far as I know none of ISO standards can be found on the Internet for free (legally!).

### C89/C90
[Draft of the ISO 9899 standard.](http://port70.net/~nsz/c/c89/c89-draft.html)

We find relevant definitions in section [3.6.6.4](http://port70.net/~nsz/c/c89/c89-draft.html#3.6.6.4):

> Constraints
> A return statement with an expression shall not appear in a function whose return type is void.
> Semantics
> [...]
> **If a return statement without an expression is executed, and the value of the function call is used by the caller, the behavior is undefined.** Reaching the } that terminates a function is equivalent to executing a return statement without an expression.

And here it is! Either an empty return statement, usually applied as exiting from a void function, or no return statement is permitted in a non-void function. However, using the value returned from that function is an **undefined behaviour**. It seems that my knowledge on return statements does indicate an influence of good old C. Examples below are perfectly fine in C89

```c
int foo()
{
	return;
}

int bar()
{}

foo();
bar();
// this would be UB
// int x = foo();
```


### C99
N1256, draft of ISO 9899:1999 with three technical corrigendums. [PDF](http://www.open-std.org/jtc1/sc22/wg14/www/standards.html#9899)

Now description of return statement is placed in paragraph 6.8.6.4:

> Constraints  
1 A return statement with an expression shall not appear in a function whose return type is void. A return statement without an expression shall only appear in a function whose return type is void.

An empty return statement is no longer permitted in a non-void function. But how the program behaves when there is no return from a non-void function? This explanation has been moved to paragraph 6.9.1/12 describing functions:

> If the } that terminates a function is reached, and the value of the function call is used by the caller, the behavior is undefined.

Nothing has changed here semantically and it is still legal to not return a value from a function. The example from previous section becomes smaller:

```c
int bar()
{}

bar();
// this would be UB
// int x = foo();
```


### C11
N1570, draft of ISO ISO 9899:2011. [PDF](http://www.open-std.org/jtc1/sc22/wg14/www/standards.html#9899) [HTML](http://port70.net/~nsz/c/c11/n1570.html)

Same as above. It seems that idea behind my code is perfectly fine in C but what about C++?

### C++98/C++03/C++11/C++14

There is [a great SO answer](http://stackoverflow.com/a/4653479) keeping up to date a list of all drafts. It seems that all standards have the same semantics although the wording is different; later it is specified that these rules do not apply for the main function. 

Paragraph 6.6.3 defines return statements:

> A return statement without an expression can be used only in functions that do not return a value, that is, a function with the return type void, a constructor (12.1), or a destructor (12.4).

C++ has introduced the concept of complex user-defined types with constructors and destructors. Not only they create a special type of functions but also indicate a potential problem with C approach to functions not returning a value. As long as we have been returning fundamental types or simple structures, there was no problem with destroying data allocated for the value returned from a function. What happens if cleaning requires calling a destructor? Standard has a very simple solution for that:

> Flowing off the end of a function is equivalent to a return with no value; this results in undefined behavior in a value-returning function.

I have to admit that as a not native English speaker I had to ask other people for clarification here, I have never heard before the verb "to flow off" in this context and I was not quite sure what it is supposed to mean. In C++ it is prohibited to not return a value from a non-void function, even when it is ignored by the caller. Each such attempt is an **undefined behaviour**. Does it mean that non-void functions with no return statements are prohibited as well? No! We do not have to always return a value:

```c++
// this is legal
int foo()
{
	std::terminate();
}

//still good
std::vector<int> bar()
{
	throw std::runtime_error();
}	

// this is undefined behaviour
float bad_function(bool flag)
{
	if(flag)
		return 1.0f;
}
bad_function(false);
```

### What may have been happening in my code?

To understand what GCC may have been doing with my obviously incorrect code, I used [Compiler Explorer](https://godbolt.org/), an online tool allowing to compare C++ code with generated assembly by displaying matching sections in the same colour. I have simplified the problem to [a function which is supposed to return one of the most common STL types](https://godbolt.org/g/KYPWnD).

<figure>
<a href="/images/2016_12/compiler_explorer.png"><img src="/images/2016_12/compiler_explorer.png" alt="image"></a>
</figure>

No vector is constructed but line 20 on assembly listing indicates a call to vector destructor! This is a clear prescription for disaster widely known as a segmentation fault. At least we know what happens in this case, but there is no *general* case for undefined behaviours.

### Conclusions?

* I could have prevented this mistake from becoming a bug by enabling warnings or even treating most of the warnings as errors. It's a pity that there is no CMake support and one has to implement compiler-dependent settings manually
* Using clang-sanitizer would also help to find the source of problem
* And the most important lesson for me: be aware of what you have learned from C and assumed it works exactly the same in C++
