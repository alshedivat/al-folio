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



## FileZilla 

### Install

```shell
brew cask install filezilla 
```

### Setting of the FileZilla: 

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





