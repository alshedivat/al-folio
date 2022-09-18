---
layout: post
title: How Browsers Work Article (Tali Garsiel)
date: '2011-08-30T22:46:00+02:00'
tags:
- html5
- browser
category: 'WWW'

---
<p>Moin Moin,</p>

<p>I recently read the super awesome article &#8220;How Browsers Work&#8221; here:</p>

<p><a href="http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/" target="_blank"><a href="http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/" target="_blank">http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/</a></a> </p>

<p>Paul Irish cleaned up the original article written by Tali Garsiel, an Israeli developer. You can find her article here:</p>

<p><a href="http://taligarsiel.com/Projects/howbrowserswork1.htm" target="_blank"><a href="http://taligarsiel.com/Projects/howbrowserswork1.htm" target="_blank">http://taligarsiel.com/Projects/howbrowserswork1.htm</a></a></p>

<p>I strongly recommend all people who develop software for the web to read this article. It provides a great look behind the scenes of how browsers work. The topics are:</p>

<p>_ the rendering engine - processing the HTML document<br/>
_ the parser with it&#8217;s lexical and syntax analysis - the lexer (tokenizer) creating tokens and the parser constructing the pars-tree by applying syntax rules<br/>
_ the HTML parser based on a DTD<br/>
_ the resulting DOM-tree after parsing HTML<br/>
_ the parsing algorithm of the HTML Parser <br/>
_ the tokenization algorithm <br/>
_ the tree construction algorithm creating elements of the resulting DOM-tree and each of it&#8217;s token<br/>
_ CSS parsing<br/>
_ render tree construction<br/>
_ creating the layout (or reflow) out of the render tree<br/>
_ the painting process - display the content elements by traversing the created render-tree<br/>
_ the CSS2 visual model</p>

<p>This is a lot of stuff and actually I am reading the article the second time. Imho the biggest benefit of studying the article is the deeper understanding how all the components of a browser work together to present the resulting website. </p>

<p>Here are some links I extracted for further reading.</p>

<p>_ The webkit rendering engine used by Chrome and Safari browsers: <a href="http://www.webkit.org/" target="_blank">http://www.webkit.org/</a></p>

<p>_ context free grammar: <br/>
<a href="http://en.wikipedia.org/wiki/Context-free_grammar" target="_blank">http://en.wikipedia.org/wiki/Context-free_grammar</a></p>

<p>_ Flex parser generator:<br/>
<a href="http://en.wikipedia.org/wiki/Flex_lexical_analyser" target="_blank">http://en.wikipedia.org/wiki/Flex_lexical_analyser</a></p>

<p>_ Bison parser generator: <br/>
<a href="http://www.gnu.org/software/bison/" target="_blank">http://www.gnu.org/software/bison/</a></p>

<p>_ HTML5 specification: <br/>
<a href="http://dev.w3.org/html5/spec/Overview.html" target="_blank">http://dev.w3.org/html5/spec/Overview.html</a></p>

<p>_ WHATWG community working on HTML: <br/>
<a href="http://www.whatwg.org/" target="_blank">http://www.whatwg.org/</a></p>

<p>_ parsing HTML: <br/>
<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html" target="_blank">http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html</a></p>

<p>_ HTML syntax: <br/>
<a href="http://www.w3.org/TR/html5/syntax.html#html-parser" target="_blank">http://www.w3.org/TR/html5/syntax.html#html-parser</a></p>

<p>_ CSS2: <br/>
<a href="http://www.w3.org/TR/CSS2/" target="_blank">http://www.w3.org/TR/CSS2/</a></p>

<p>_ CSS specification: <br/>
<a href="http://www.w3.org/TR/CSS2/grammar.html" target="_blank">http://www.w3.org/TR/CSS2/grammar.html</a></p>

<p>_ CSS2 box-model: <br/>
<a href="http://www.w3.org/TR/CSS2/box.html" target="_blank">http://www.w3.org/TR/CSS2/box.html</a></p>

<p>Some of the links are kind of lame to read in a way but still very interesting for digging deeper.</p>

<p>I hope you enjoy reading the article the same way I do.</p>

<p>Cheers</p>

<p>Andy</p>
