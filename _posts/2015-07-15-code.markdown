---
layout: post
title: a post with code
date: 2015-07-15 15:09:00
description: an example of a blog post with some code
---
This theme implements a built-in Jekyll feature, the use of Pygments, for sytanx highlighting. It supports more than 100 languages. This example is in C++. All you have to do is wrap your code in a liquid tag:

{% raw  %}
{% highlight c++ %}  <br/> code code code <br/> {% endhighlight %}
{% endraw %}

Produces something like this:

{% highlight c++ %}

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

{% endhighlight %}
