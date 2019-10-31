---
layout: post
title: a post with cheat sheets
date: 2018-12-23 17:59:00+0800
description: List some useful cheat sheets. 
---
In this note, we list some useful tools. 

[TOC]

## MacOS 
* [MacOS terminal](/docs/cheatsheets/mac_terminal.pdf)
* [Bash cheat sheet](/docs/cheatsheets/bash-cheatsheet.pdf)
* [大前端工具集](https://github.com/nieweidong/fetool)


## Functions of github 



* When update a webpage: 
{% highlight shell %}
func_upWebpage(){
    git pull
    git add --all
    git commit -m "$1"
    git push -u origin master
    ./bin/deploy 
    
}
{% endhighlight %}

{% highlight vim %}
" This is the vim code . "
function! Tex_Hat()
    return "\<Left>\\hat{\<Right>}"
endfunction 
{% endhighlight %}


## Latex 

#### Latexdiff command 

* 编译`tex`文件时, 经常需要对比不同的版本. `latexdiff` 提供了一个对比不同`tex`文本的工具. 
{% highlight shell %}
latexdiff file1.tex file2.tex > file_diff.tex 
{% endhighlight %}

* 编译`file_diff.tex`, 就可以得到所要的对比文件. 

* [latexdiff 使用说明](http://manpages.ubuntu.com/manpages/bionic/man1/latexdiff.1.html)


* 比如在我的`tex`文件里, 新定义了一个`equ`的数学环境, 那么在编译时, 应当用:
{% highlight shell %}
latexdiff --config "MATHARRENV=equ|align[*]" queuemodel20190103.tex queuemodel20190104.tex > diff0104.tex
{% endhighlight %}

```
This is a list of code. 
```

* `file1.tex`: 

```tex
\documentclass{article}

\newcommand{\foo}[1]{New: #1}

\begin{document}

Bla.

\end{document}
```

* `file2.tex`: 


```tex
\documentclass{article}

\newcommand{\foo}[1]{New: #1}

\begin{document}

\foo{Bla}.

\end{document}
```

* 运行: `latexdiff file1.tex file2.tex > delta.tex`: 


```tex 
\documentclass{article}
% 中间省略
\begin{document}

\DIFdelbegin \DIFdel{Bla}\DIFdelend \DIFaddbegin \DIFadd{\foo{Bla}}\DIFaddend .

\end{document}
```
* 如果不想标记`\foo{}` 这个函数, 运行: `latexdiff file1.tex file2.tex > delta.tex --exclude-safecmd="foo"`, 则得到: 

```tex
\documentclass{article}
% 中间省略
\begin{document}

\DIFdelbegin \DIFdel{Bla}\DIFdelend \DIFaddbegin \foo{Bla} \DIFaddend .

\end{document}
```

* ` --append-textcmd=conep`. 

####  long text in equation environment, with line break:  use `\parbox` command, for example:

```
\begin{gather}
\sup_{x \in J} \int_{\mathbb{R}} y^2 f \( y | x \) \dd y = M_0 < \infty; {
\E \lvert Y \rvert^{\lambda} < \infty, \quad  \text{with} \ 2 < \lambda \leq \infty; \\
0 < m_1 \leq f_0 \( x \) \leq M_1 < \infty, \quad  x \in J; \\
\text{\parbox{9cm}{the functions $f_0\( x \)$ and $g_0 \( x \) = \int y f\( x, y \) \dd y $ are ulL\-$\alpha$  on $J$,  with $0 < \alpha \leq 1$\.}}
\end{gather}
```



####  tcolorbox environment with page break: use `breakable` tag in the tcolorbox option\.
_
```
\documentclass{article}
\usepackage{lipsum} % generate dummy text
\usepackage{color}
\usepackage[breakable,skins]{tcolorbox}

\colorlet{shadecolor}{orange\!20}
\newtcolorbox{mybox}[1]{breakable,colback=red\!5\!white,
colframe=red\!75\!black,fonttitle=\bfseries,
title=#1}
\begin{document}
\begin{mybox}\
{Title}
\lipsum[1\-7[
\end{mybox}
\end{document]
```

#### Latex clean error: vimtex plugin

```
Error detected while processing function vimtex#compiler#cl
ean[1]..325[15]..vimtex#process#run[5]..454[5]..459:
line    2:
E484: Can't open file /var/folders/68/3d736r255njc7tlvp0yx8
k6r0000gn/T/vNnI5vr/2
```

And moreover, when using `\lv`, the skim app doesn’t open. 

Solution: Don’t use `’` in the file name and folder name.


####  Preview always opens the history documents. 

```
defaults write com.apple.Preview NSQuitAlwaysKeepsWindows -bool false
```

#### LaTeX beamer: frame breaks: 

Use `allowframebreaks` option in the frame environment. 

For example: 

```
\documentclass{beamer}
\begin{document}
\begin{frame}[allowframebreaks]{Title}
A\\ A\\ A\\ A\\ A\\ A\\ A\\ A\\ A\\ A\\ A\\ A\\ A\\
B\\ B\\ B\\ B\\ B\\ B\\ B\\
 B\\ B\\ B\\ B\\ B\\ B\\
\end{frame}
\end{document}
```

## FileZilla 

#### Install

```shell
brew cask install filezilla 
```

#### Setting of the FileZilla: 

> |--:|--|
> |**username**| `username@unimelb`|
> | **host** |`boreas.ms.unimelb.edu.au`|
> | **password**| `mypassword`|
> | **port**| 21 or 22 |


## R language 

### 1. RStudio 开发R包

#### 1. 创建R包
#### 2. 编辑项目描述文件`DESCRIPTION`和`NAMESPACE`
#### 3. 编辑R程序代码
#### 4. 编辑帮助文档`man/name.Rd`
#### 5. 执行`build`和`reload`
点击Rstudio的Build菜单中的`Build&Reload`按钮
#### 6. 执行`check`

### 2. 标准化R包开发流程

简单的R包开发的方法

#### 1. 开发流程介绍

* *devtools*: 各种开发小工具的合集,让开发变得简单、实用
* *roxygen*: 通过注释的方式, 生成文档
* *testthat*: 单元测试. 

#### 2. 编写功能代码

a) 安装程序包:

{% highlight r %}
    brew install libcurl4-openssl-dev 

    install.package("devtools")
    install.package("roxygen2")
    install.package("testthat")
{% endhighlight %}

b) 创建项目`chinaWeather`


## Some useful math inequalities
#### 1. The Natalini-Palumbo inequality: 

Let $$z > 0$$ and define 

$$\Gamma(a, z) = \int_{z}^{\infty} e^{-x} x^{a - 1} d x , $$

then for $$a > 1, B > 1$$ and  $$x > B (a - 1)/B$$, we have  

$$ z^{a - 1} e^{-x} \leq  \lvert \Gamma(a,z) \rvert \leq B z^{a - 1} e^{-x}.$$

Using this inequality, we can prove: for $$\alpha \in (0,1)$$, 

$$
\sum_{i = j}^n e^{-ci^{\alpha} + cj^{\alpha}} \leq C \int_{j}^n e^{- a (x^\alpha - j^{\alpha})} d x \leq C j^{1 - \alpha}.
$$

* Reference: P. Natalini and B. Palumbo, *Inequalities for the incomplete gamma function*, Math. Inequal. Appl. **3** (2000), no. 1, 69–77.

Done.





