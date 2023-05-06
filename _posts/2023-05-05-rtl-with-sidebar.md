---
layout: post
title: یک عنوان راست‌به‌چپ
date: 2023-05-05
description: RTL even in sidebar
lang: fa
tags: internationalization formatting math code
category: internationalization
related_posts: false
toc:
  sidebar: right  
---

# عنوان
این یک پست نمونه برای سنجش نوشتارهای راست‌به‌چپ است.


## فرمول‌نویسی
فرمول‌ها هم مانند کد به درستی به نمایش در‌خواهند آمد:


$$
\sum_{k=1}^\infty |\langle x, e_k \rangle|^2 \leq \|x\|^2
$$

## کد
کدها هم‌چنان مانند قبل از چپ‌به‌راست خواهند بود.

```python
if lang=="rtl"
    print("I am a right-to-left script!")
```

## بلاک
بلاک‌ها همواره چپ‌چین خواهند ماند:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---
    
حتی اگر به زبان‌های راست‌به‌چپ نوشته شوند:
    
    ---
    صفحه‌بندی: صفحه
    عنوان: پروژه
    توضیحات: یک پروژه با تصویر زمینه
    ---
    
## نقل‌قول
> نقل‌قول‌ها به این شکل به نمایش درخواهند آمد.

زیباتر خواهد بود اگر خط عمودی به راست انتقال داده شود. این کار با ویرایش _base.scss امکان‌پذیر است:

```c++
int main(int argc, char const \*argv[])
{
    string myString;

    cout << "input a string: ";
    getline(cin, myString);
    int length = myString.length();

    char charArray = new char * [length];

    charArray = myString;
    for(int i = 0; i < length; ++i){
        cout << charArray[i] << " ";
    }

    return 0;
}
```

و حتی می‌توان شماره‌ی خطوط را هم مانند قبل قعال کرد:
{% highlight python linenos %}
import numpy as np

print('Hello world!')
{% endhighlight %}
